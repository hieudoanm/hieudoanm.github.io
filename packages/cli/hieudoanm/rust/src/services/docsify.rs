use std::collections::HashMap;
use std::path::Path;

#[derive(Debug, Clone)]
pub struct File {
    pub abs_path: String,
    pub rel_path: String,
    pub lang: Language,
}

#[derive(Debug, Clone, Copy, PartialEq)]
pub enum Language {
    Go,
    TypeScript,
    JavaScript,
    Python,
    Rust,
    Unknown,
}

impl Language {
    pub fn as_str(&self) -> &'static str {
        match self {
            Language::Go => "go",
            Language::TypeScript => "typescript",
            Language::JavaScript => "javascript",
            Language::Python => "python",
            Language::Rust => "rust",
            Language::Unknown => "unknown",
        }
    }
}

fn ext_lang(ext: &str) -> Language {
    match ext {
        ".go" => Language::Go,
        ".ts" | ".tsx" => Language::TypeScript,
        ".js" | ".jsx" => Language::JavaScript,
        ".py" => Language::Python,
        ".rs" => Language::Rust,
        _ => Language::Unknown,
    }
}

pub fn walk(root: &str, exclude: &HashMap<String, bool>) -> Result<Vec<File>, anyhow::Error> {
    let mut files = Vec::new();

    for entry in walkdir::WalkDir::new(root)
        .into_iter()
        .filter_entry(|e| {
            let name = e.file_name().to_string_lossy().to_string();
            if name.starts_with('.') || exclude.contains_key(&name) {
                return false;
            }
            true
        })
    {
        let entry = entry?;
        if !entry.file_type().is_file() {
            continue;
        }
        let path = entry.path();
        let ext = path.extension().and_then(|e| e.to_str()).map(|e| format!(".{e}")).unwrap_or_default();
        let lang = ext_lang(&ext);
        if matches!(lang, Language::Unknown) {
            continue;
        }
        let abs_path = path.to_string_lossy().to_string();
        let rel_path = path
            .strip_prefix(root)
            .map(|p| p.to_string_lossy().to_string())
            .unwrap_or_else(|_| abs_path.clone());

        files.push(File { abs_path, rel_path, lang });
    }

    Ok(files)
}

#[derive(Debug, Clone)]
pub enum SymbolKind {
    Function,
    Method,
    Type,
    Interface,
    Class,
    Variable,
    Constant,
}

#[derive(Debug, Clone)]
pub struct Symbol {
    pub name: String,
    pub kind: SymbolKind,
    pub line: usize,
    pub receiver: String,
    pub exported: bool,
}

#[derive(Debug, Clone)]
pub struct CallEdge {
    pub caller_name: String,
    pub callee_name: String,
    pub line: usize,
}

#[derive(Debug, Clone)]
pub struct FileInfo {
    pub file: File,
    pub symbols: Vec<Symbol>,
    pub calls: Vec<CallEdge>,
}

pub fn extract(f: &File) -> Result<FileInfo, anyhow::Error> {
    let src = std::fs::read_to_string(&f.abs_path)?;
    let mut info = FileInfo {
        file: File { abs_path: f.abs_path.clone(), rel_path: f.rel_path.clone(), lang: f.lang },
        symbols: Vec::new(),
        calls: Vec::new(),
    };

    match f.lang {
        Language::Go => extract_go(&src, &mut info),
        Language::TypeScript | Language::JavaScript => extract_ts(&src, &mut info),
        Language::Python => extract_python(&src, &mut info),
        Language::Rust => extract_rust(&src, &mut info),
        Language::Unknown => {}
    }

    Ok(info)
}

fn is_exported(name: &str) -> bool {
    if name.is_empty() {
        return false;
    }
    name.chars().next().map(|c| c.is_ascii_uppercase()).unwrap_or(false)
}

fn is_go_builtin(name: &str) -> bool {
    matches!(name, "append" | "cap" | "close" | "complex" | "copy" | "delete" | "imag" | "len" | "make" | "new" | "panic" | "print" | "println" | "real" | "recover" | "string" | "int" | "bool" | "byte" | "rune" | "error" | "float64" | "int64" | "uint64" | "fmt" | "os" | "err")
}

fn is_ts_builtin(name: &str) -> bool {
    matches!(name, "console" | "setTimeout" | "setInterval" | "clearTimeout" | "parseInt" | "parseFloat" | "isNaN" | "isFinite" | "String" | "Number" | "Boolean" | "Array" | "Object" | "Promise" | "JSON" | "Math" | "Date" | "Error" | "require" | "if" | "for" | "while" | "switch" | "return")
}

fn is_py_builtin(name: &str) -> bool {
    matches!(name, "print" | "len" | "range" | "type" | "isinstance" | "int" | "str" | "float" | "bool" | "list" | "dict" | "set" | "tuple" | "enumerate" | "zip" | "map" | "filter" | "sorted" | "reversed" | "open" | "super")
}

fn is_rs_builtin(name: &str) -> bool {
    matches!(name, "println" | "print" | "eprintln" | "eprint" | "vec" | "format" | "panic" | "assert" | "todo" | "unimplemented" | "unreachable" | "dbg" | "Some" | "None" | "Ok" | "Err" | "Box" | "String" | "Vec" | "if" | "for" | "while" | "match" | "return")
}

fn extract_go(src: &str, info: &mut FileInfo) {
    let re_func = regex::Regex::new(r"^func\s+(?:\((\w+)\s+\*?\w+\)\s+)?(\w+)\s*\(").unwrap();
    let re_type = regex::Regex::new(r"^type\s+(\w+)\s+(struct|interface)\b").unwrap();
    let re_var = regex::Regex::new(r"^(?:var|const)\s+(\w+)\b").unwrap();
    let re_call = regex::Regex::new(r"\b([A-Za-z_]\w*)\s*\(").unwrap();

    let lines: Vec<&str> = src.lines().collect();
    let mut current_func = String::new();

    for (i, line) in lines.iter().enumerate() {
        let trimmed = line.trim();
        let line_no = i + 1;

        if let Some(caps) = re_func.captures(trimmed) {
            let receiver = caps.get(1).map(|m| m.as_str().to_string()).unwrap_or_default();
            let name = caps[2].to_string();
            let kind = if receiver.is_empty() { SymbolKind::Function } else { SymbolKind::Method };
            info.symbols.push(Symbol {
                name: name.clone(),
                kind,
                line: line_no,
                receiver,
                exported: is_exported(&name),
            });
            current_func = name;
            continue;
        }

        if let Some(caps) = re_type.captures(trimmed) {
            let kind = if &caps[2] == "interface" { SymbolKind::Interface } else { SymbolKind::Type };
            info.symbols.push(Symbol {
                name: caps[1].to_string(),
                kind,
                line: line_no,
                receiver: String::new(),
                exported: is_exported(&caps[1]),
            });
            continue;
        }

        if let Some(caps) = re_var.captures(trimmed) {
            info.symbols.push(Symbol {
                name: caps[1].to_string(),
                kind: SymbolKind::Variable,
                line: line_no,
                receiver: String::new(),
                exported: is_exported(&caps[1]),
            });
            continue;
        }

        if !current_func.is_empty() {
            for cap in re_call.captures_iter(trimmed) {
                let callee = cap[1].to_string();
                if is_go_builtin(&callee) || callee == current_func {
                    continue;
                }
                info.calls.push(CallEdge {
                    caller_name: current_func.clone(),
                    callee_name: callee,
                    line: line_no,
                });
            }
        }
    }
}

fn extract_ts(src: &str, info: &mut FileInfo) {
    let re_func = regex::Regex::new(r"(?:^|\s)(?:export\s+)?(?:async\s+)?function\s+(\w+)\s*[(<]").unwrap();
    let re_arrow = regex::Regex::new(r"(?:^|\s)(?:export\s+)?(?:const|let|var)\s+(\w+)\s*=\s*(?:async\s*)?\(|\s*=\s*(?:async\s*)?\(?").unwrap();
    let re_class = regex::Regex::new(r"(?:^|\s)(?:export\s+)?(?:abstract\s+)?class\s+(\w+)\b").unwrap();
    let re_iface = regex::Regex::new(r"(?:^|\s)(?:export\s+)?interface\s+(\w+)\b").unwrap();
    let re_type = regex::Regex::new(r"(?:^|\s)(?:export\s+)?type\s+(\w+)\s*=").unwrap();
    let re_const = regex::Regex::new(r"(?:^|\s)(?:export\s+)?const\s+(\w+)\s*[=:]").unwrap();
    let re_call = regex::Regex::new(r"\b([A-Za-z_]\w*)\s*\(").unwrap();

    let lines: Vec<&str> = src.lines().collect();
    let mut current_func = String::new();

    for (i, line) in lines.iter().enumerate() {
        let trimmed = line.trim();
        let line_no = i + 1;

        if let Some(caps) = re_func.captures(trimmed) {
            info.symbols.push(Symbol {
                name: caps[1].to_string(),
                kind: SymbolKind::Function,
                line: line_no,
                receiver: String::new(),
                exported: line.contains("export"),
            });
            current_func = caps[1].to_string();
            continue;
        }
        if let Some(caps) = re_arrow.captures(trimmed) {
            info.symbols.push(Symbol {
                name: caps[1].to_string(),
                kind: SymbolKind::Function,
                line: line_no,
                receiver: String::new(),
                exported: line.contains("export"),
            });
            current_func = caps[1].to_string();
            continue;
        }
        if let Some(caps) = re_class.captures(trimmed) {
            info.symbols.push(Symbol {
                name: caps[1].to_string(),
                kind: SymbolKind::Class,
                line: line_no,
                receiver: String::new(),
                exported: line.contains("export"),
            });
            continue;
        }
        if let Some(caps) = re_iface.captures(trimmed) {
            info.symbols.push(Symbol {
                name: caps[1].to_string(),
                kind: SymbolKind::Interface,
                line: line_no,
                receiver: String::new(),
                exported: line.contains("export"),
            });
            continue;
        }
        if let Some(caps) = re_type.captures(trimmed) {
            info.symbols.push(Symbol {
                name: caps[1].to_string(),
                kind: SymbolKind::Type,
                line: line_no,
                receiver: String::new(),
                exported: line.contains("export"),
            });
            continue;
        }
        if let Some(caps) = re_const.captures(trimmed) {
            info.symbols.push(Symbol {
                name: caps[1].to_string(),
                kind: SymbolKind::Constant,
                line: line_no,
                receiver: String::new(),
                exported: line.contains("export"),
            });
            continue;
        }

        if !current_func.is_empty() {
            for cap in re_call.captures_iter(trimmed) {
                let callee = cap[1].to_string();
                if is_ts_builtin(&callee) || callee == current_func {
                    continue;
                }
                info.calls.push(CallEdge {
                    caller_name: current_func.clone(),
                    callee_name: callee,
                    line: line_no,
                });
            }
        }
    }
}

fn extract_python(src: &str, info: &mut FileInfo) {
    let re_func = regex::Regex::new(r"^(?:async\s+)?def\s+(\w+)\s*\(").unwrap();
    let re_class = regex::Regex::new(r"^class\s+(\w+)\b").unwrap();
    let re_const = regex::Regex::new(r"^([A-Z_][A-Z0-9_]*)\s*=").unwrap();
    let re_call = regex::Regex::new(r"\b([A-Za-z_]\w*)\s*\(").unwrap();

    let lines: Vec<&str> = src.lines().collect();
    let mut current_func = String::new();

    for (i, line) in lines.iter().enumerate() {
        let trimmed = line.trim();
        let line_no = i + 1;

        if let Some(caps) = re_func.captures(trimmed) {
            let name = caps[1].to_string();
            info.symbols.push(Symbol {
                name: name.clone(),
                kind: SymbolKind::Function,
                line: line_no,
                receiver: String::new(),
                exported: !name.starts_with('_'),
            });
            current_func = name;
            continue;
        }
        if let Some(caps) = re_class.captures(trimmed) {
            let name = caps[1].to_string();
            info.symbols.push(Symbol {
                name: name.clone(),
                kind: SymbolKind::Class,
                line: line_no,
                receiver: String::new(),
                exported: !name.starts_with('_'),
            });
            continue;
        }
        if let Some(caps) = re_const.captures(trimmed) {
            info.symbols.push(Symbol {
                name: caps[1].to_string(),
                kind: SymbolKind::Constant,
                line: line_no,
                receiver: String::new(),
                exported: true,
            });
            continue;
        }

        if !current_func.is_empty() {
            for cap in re_call.captures_iter(trimmed) {
                let callee = cap[1].to_string();
                if is_py_builtin(&callee) || callee == current_func {
                    continue;
                }
                info.calls.push(CallEdge {
                    caller_name: current_func.clone(),
                    callee_name: callee,
                    line: line_no,
                });
            }
        }
    }
}

fn extract_rust(src: &str, info: &mut FileInfo) {
    let re_func = regex::Regex::new(r"(?:^|\s)(?:pub\s+)?(?:async\s+)?fn\s+(\w+)\s*[(<]").unwrap();
    let re_struct = regex::Regex::new(r"(?:^|\s)(?:pub\s+)?struct\s+(\w+)\b").unwrap();
    let re_trait = regex::Regex::new(r"(?:^|\s)(?:pub\s+)?trait\s+(\w+)\b").unwrap();
    let re_enum = regex::Regex::new(r"(?:^|\s)(?:pub\s+)?enum\s+(\w+)\b").unwrap();
    let re_const = regex::Regex::new(r"(?:^|\s)(?:pub\s+)?const\s+(\w+)\s*:").unwrap();
    let re_call = regex::Regex::new(r"\b([A-Za-z_]\w*)\s*\(").unwrap();

    let lines: Vec<&str> = src.lines().collect();
    let mut current_func = String::new();

    for (i, line) in lines.iter().enumerate() {
        let trimmed = line.trim();
        let line_no = i + 1;

        if let Some(caps) = re_func.captures(trimmed) {
            let name = caps[1].to_string();
            info.symbols.push(Symbol {
                name: name.clone(),
                kind: SymbolKind::Function,
                line: line_no,
                receiver: String::new(),
                exported: line.contains("pub "),
            });
            current_func = name;
            continue;
        }
        if let Some(caps) = re_struct.captures(trimmed) {
            info.symbols.push(Symbol {
                name: caps[1].to_string(),
                kind: SymbolKind::Type,
                line: line_no,
                receiver: String::new(),
                exported: line.contains("pub "),
            });
            continue;
        }
        if let Some(caps) = re_trait.captures(trimmed) {
            info.symbols.push(Symbol {
                name: caps[1].to_string(),
                kind: SymbolKind::Interface,
                line: line_no,
                receiver: String::new(),
                exported: line.contains("pub "),
            });
            continue;
        }
        if let Some(caps) = re_enum.captures(trimmed) {
            info.symbols.push(Symbol {
                name: caps[1].to_string(),
                kind: SymbolKind::Type,
                line: line_no,
                receiver: String::new(),
                exported: line.contains("pub "),
            });
            continue;
        }
        if let Some(caps) = re_const.captures(trimmed) {
            info.symbols.push(Symbol {
                name: caps[1].to_string(),
                kind: SymbolKind::Constant,
                line: line_no,
                receiver: String::new(),
                exported: line.contains("pub "),
            });
            continue;
        }

        if !current_func.is_empty() {
            for cap in re_call.captures_iter(trimmed) {
                let callee = cap[1].to_string();
                if is_rs_builtin(&callee) || callee == current_func {
                    continue;
                }
                info.calls.push(CallEdge {
                    caller_name: current_func.clone(),
                    callee_name: callee,
                    line: line_no,
                });
            }
        }
    }
}

pub fn file_base_name(path: &str) -> String {
    let p = Path::new(path);
    p.file_stem().map(|s| s.to_string_lossy().to_string()).unwrap_or_default()
}

#[derive(Debug, Clone)]
pub enum NodeKind {
    File,
    Function,
    Method,
    Type,
    Interface,
    Class,
    Variable,
    Constant,
}

impl NodeKind {
    pub fn as_str(&self) -> &'static str {
        match self {
            NodeKind::File => "file",
            NodeKind::Function => "function",
            NodeKind::Method => "method",
            NodeKind::Type => "type",
            NodeKind::Interface => "interface",
            NodeKind::Class => "class",
            NodeKind::Variable => "variable",
            NodeKind::Constant => "constant",
        }
    }
}

#[derive(Debug, Clone, Copy, PartialEq)]
pub enum EdgeKind {
    Contains,
    Calls,
}

impl EdgeKind {
    pub fn as_str(&self) -> &'static str {
        match self {
            EdgeKind::Contains => "contains",
            EdgeKind::Calls => "calls",
        }
    }
}

#[derive(Debug, Clone)]
pub struct Node {
    pub id: String,
    pub kind: NodeKind,
    pub label: String,
    pub file: String,
    pub line: usize,
    pub lang: String,
    pub exported: bool,
}

#[derive(Debug, Clone)]
pub struct Edge {
    pub id: String,
    pub source: String,
    pub target: String,
    pub kind: EdgeKind,
    pub line: usize,
}

pub struct Graph {
    pub nodes: Vec<Node>,
    pub edges: Vec<Edge>,
    node_by_id: HashMap<String, Node>,
    symbol_index: HashMap<String, Vec<String>>,
    edge_counter: usize,
}

impl Graph {
    pub fn new() -> Self {
        Self {
            nodes: Vec::new(),
            edges: Vec::new(),
            node_by_id: HashMap::new(),
            symbol_index: HashMap::new(),
            edge_counter: 0,
        }
    }

    pub fn add_file(&mut self, info: &FileInfo) {
        let file_id = sanitize_id(&format!("file:{}", info.file.rel_path));
        let file_node = Node {
            id: file_id.clone(),
            kind: NodeKind::File,
            label: info.file.rel_path.clone(),
            file: info.file.rel_path.clone(),
            line: 0,
            lang: info.file.lang.as_str().to_string(),
            exported: false,
        };
        self.add_node(file_node);

        for sym in &info.symbols {
            let sym_id = sanitize_id(&format!("sym:{}:{}:{}", info.file.rel_path, sym.name, sym.line));
            let sym_node = Node {
                id: sym_id.clone(),
                kind: symbol_to_node_kind(&sym.kind),
                label: sym.name.clone(),
                file: info.file.rel_path.clone(),
                line: sym.line,
                lang: info.file.lang.as_str().to_string(),
                exported: sym.exported,
            };
            self.add_node(sym_node);

            self.symbol_index.entry(sym.name.clone()).or_default().push(sym_id.clone());

            let edge_id = format!("e{}", self.next_edge_id());
        self.edges.push(Edge {
                id: edge_id,
                source: file_id.clone(),
                target: sym_id,
                kind: EdgeKind::Contains,
                line: sym.line,
            });
        }

        for call in &info.calls {
            let caller_id = self.find_symbol_in_file(&call.caller_name, &info.file.rel_path);
            if caller_id.is_empty() {
                continue;
            }
            let edge_id = format!("e{}", self.next_edge_id());
            self.edges.push(Edge {
                id: edge_id,
                source: caller_id,
                target: format!("UNRESOLVED:{}", call.callee_name),
                kind: EdgeKind::Calls,
                line: call.line,
            });
        }
    }

    pub fn resolve_call_edges(&mut self) {
        let mut resolved = Vec::new();
        let mut counter = self.edge_counter;

        for e in self.edges.drain(..) {
            if !e.target.starts_with("UNRESOLVED:") {
                resolved.push(e);
                continue;
            }
            let callee_name = e.target.trim_start_matches("UNRESOLVED:");
            if let Some(targets) = self.symbol_index.get(callee_name) {
                for (i, t) in targets.iter().enumerate() {
                    let edge_id = if i == 0 { e.id.clone() } else { counter += 1; format!("e{counter}") };
                    resolved.push(Edge {
                        id: edge_id,
                        source: e.source.clone(),
                        target: t.clone(),
                        kind: EdgeKind::Calls,
                        line: e.line,
                    });
                }
            }
        }

        self.edge_counter = counter;
        self.edges = resolved;
    }

    pub fn node_count(&self) -> usize {
        self.nodes.len()
    }

    pub fn edge_count(&self) -> usize {
        self.edges.len()
    }

    fn add_node(&mut self, n: Node) {
        if !self.node_by_id.contains_key(&n.id) {
            self.node_by_id.insert(n.id.clone(), n.clone());
            self.nodes.push(n);
        }
    }

    fn next_edge_id(&mut self) -> usize {
        self.edge_counter += 1;
        self.edge_counter
    }

    fn find_symbol_in_file(&self, name: &str, rel_path: &str) -> String {
        if let Some(candidates) = self.symbol_index.get(name) {
            for id in candidates {
                if let Some(n) = self.node_by_id.get(id) {
                    if n.file == rel_path {
                        return id.clone();
                    }
                }
            }
        }
        String::new()
    }
}

fn symbol_to_node_kind(k: &SymbolKind) -> NodeKind {
    match k {
        SymbolKind::Function => NodeKind::Function,
        SymbolKind::Method => NodeKind::Method,
        SymbolKind::Type => NodeKind::Type,
        SymbolKind::Interface => NodeKind::Interface,
        SymbolKind::Class => NodeKind::Class,
        SymbolKind::Variable => NodeKind::Variable,
        SymbolKind::Constant => NodeKind::Constant,
    }
}

fn sanitize_id(s: &str) -> String {
    s.replace('/', "_")
        .replace('\\', "_")
        .replace('.', "_")
        .replace(' ', "_")
        .replace(':', "_")
        .replace('-', "_")
}

use quick_xml::events::{BytesDecl, BytesEnd, BytesStart, BytesText, Event};
use quick_xml::Writer;


pub fn write_graphml<W: std::io::Write>(g: &Graph, writer: W) -> Result<(), anyhow::Error> {
    let mut w = Writer::new_with_indent(writer, b' ', 2);

    let decl = BytesDecl::new("1.0", Some("UTF-8"), None);
    w.write_event(Event::Decl(decl))?;

    let mut root = BytesStart::new("graphml");
    root.push_attribute(("xmlns", "http://graphml.graphdrawing.org/graphml"));
    root.push_attribute(("xmlns:xsi", "http://www.w3.org/2001/XMLSchema-instance"));
    root.push_attribute(("xsi:schemaLocation", "http://graphml.graphdrawing.org/graphml http://graphml.graphdrawing.org/graphml/1.0/graphml.xsd"));
    w.write_event(Event::Start(root))?;

    let node_keys = [
        ("d_kind", "node", "kind", "string"),
        ("d_label", "node", "label", "string"),
        ("d_file", "node", "file", "string"),
        ("d_line", "node", "line", "int"),
        ("d_lang", "node", "lang", "string"),
        ("d_exported", "node", "exported", "boolean"),
    ];
    for (id, for_attr, name, dtype) in &node_keys {
        let mut key = BytesStart::new("key");
        key.push_attribute(("id", *id));
        key.push_attribute(("for", *for_attr));
        key.push_attribute(("attr.name", *name));
        key.push_attribute(("attr.type", *dtype));
        w.write_event(Event::Empty(key))?;
    }

    let edge_keys = [
        ("e_kind", "edge", "kind", "string"),
        ("e_line", "edge", "line", "int"),
    ];
    for (id, for_attr, name, dtype) in &edge_keys {
        let mut key = BytesStart::new("key");
        key.push_attribute(("id", *id));
        key.push_attribute(("for", *for_attr));
        key.push_attribute(("attr.name", *name));
        key.push_attribute(("attr.type", *dtype));
        w.write_event(Event::Empty(key))?;
    }

    let graph_keys = [
        ("g_generated", "graph", "generated", "string"),
        ("g_version", "graph", "version", "string"),
    ];
    for (id, for_attr, name, dtype) in &graph_keys {
        let mut key = BytesStart::new("key");
        key.push_attribute(("id", *id));
        key.push_attribute(("for", *for_attr));
        key.push_attribute(("attr.name", *name));
        key.push_attribute(("attr.type", *dtype));
        w.write_event(Event::Empty(key))?;
    }

    let mut graph = BytesStart::new("graph");
    graph.push_attribute(("id", "codebase"));
    graph.push_attribute(("edgedefault", "directed"));
    w.write_event(Event::Start(graph))?;

    let generated = chrono::Utc::now().format("%Y-%m-%dT%H:%M:%SZ").to_string();
    let graph_data = [
        ("g_generated", generated.as_str()),
        ("g_version", "1"),
    ];
    for (key, val) in &graph_data {
        let mut data = BytesStart::new("data");
        data.push_attribute(("key", *key));
        w.write_event(Event::Start(data))?;
        w.write_event(Event::Text(BytesText::new(val)))?;
        w.write_event(Event::End(BytesEnd::new("data")))?;
    }

    for n in &g.nodes {
        let mut node = BytesStart::new("node");
        node.push_attribute(("id", n.id.as_str()));
        w.write_event(Event::Start(node))?;

        let node_data = [
            ("d_kind", n.kind.as_str()),
            ("d_label", n.label.as_str()),
            ("d_file", n.file.as_str()),
            ("d_line", &n.line.to_string()),
            ("d_lang", n.lang.as_str()),
            ("d_exported", if n.exported { "true" } else { "false" }),
        ];
        for (key, val) in &node_data {
            let mut data = BytesStart::new("data");
            data.push_attribute(("key", *key));
            w.write_event(Event::Start(data))?;
            w.write_event(Event::Text(BytesText::new(val)))?;
            w.write_event(Event::End(BytesEnd::new("data")))?;
        }

        w.write_event(Event::End(BytesEnd::new("node")))?;
    }

    for e in &g.edges {
        let mut edge = BytesStart::new("edge");
        edge.push_attribute(("id", e.id.as_str()));
        edge.push_attribute(("source", e.source.as_str()));
        edge.push_attribute(("target", e.target.as_str()));
        w.write_event(Event::Start(edge))?;

        let edge_data = [
            ("e_kind", e.kind.as_str()),
            ("e_line", &e.line.to_string()),
        ];
        for (key, val) in &edge_data {
            let mut data = BytesStart::new("data");
            data.push_attribute(("key", *key));
            w.write_event(Event::Start(data))?;
            w.write_event(Event::Text(BytesText::new(val)))?;
            w.write_event(Event::End(BytesEnd::new("data")))?;
        }

        w.write_event(Event::End(BytesEnd::new("edge")))?;
    }

    w.write_event(Event::End(BytesEnd::new("graph")))?;
    w.write_event(Event::End(BytesEnd::new("graphml")))?;

    Ok(())
}
