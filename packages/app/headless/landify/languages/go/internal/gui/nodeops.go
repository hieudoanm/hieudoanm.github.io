package gui

import (
	"bytes"
	"fmt"
	"strings"

	"gopkg.in/yaml.v3"
)

// parseDoc parses data into a yaml.v3 document node.
func parseDoc(data string) (*yaml.Node, error) {
	var root yaml.Node
	if err := yaml.Unmarshal([]byte(data), &root); err != nil {
		return nil, fmt.Errorf("parse yaml: %w", err)
	}
	return &root, nil
}

// encodeDoc encodes a document node back to a YAML string.
func encodeDoc(root *yaml.Node) (string, error) {
	var buf bytes.Buffer
	enc := yaml.NewEncoder(&buf)
	enc.SetIndent(2)
	if err := enc.Encode(root); err != nil {
		return "", fmt.Errorf("encode yaml: %w", err)
	}
	if err := enc.Close(); err != nil {
		return "", err
	}
	return buf.String(), nil
}

// mappingChild returns the value node for key in a mapping node, or nil if
// the key is not present.
func mappingChild(m *yaml.Node, key string) *yaml.Node {
	for i := 0; i+1 < len(m.Content); i += 2 {
		if m.Content[i].Value == key {
			return m.Content[i+1]
		}
	}
	return nil
}

// ensureMapping creates a child mapping node under parent for the given key
// and returns it. If the key already exists, it must be a mapping node; if it
// is missing, a new empty mapping is inserted.
func ensureMapping(parent *yaml.Node, key string) (*yaml.Node, error) {
	if cur := mappingChild(parent, key); cur != nil {
		if cur.Kind == yaml.MappingNode {
			return cur, nil
		}
		return nil, fmt.Errorf("%s is a %v, not a mapping", key, cur.Kind)
	}
	keyNode := &yaml.Node{Kind: yaml.ScalarNode, Tag: "!!str", Value: key}
	valNode := &yaml.Node{Kind: yaml.MappingNode, Tag: "!!map"}
	parent.Content = append(parent.Content, keyNode, valNode)
	return valNode, nil
}

// ensureMapping creates a child sequence node under parent for the given key
// and returns it. If the key already exists, it must be a sequence node; if
// it is missing, a new empty sequence is inserted.
func ensureSequence(parent *yaml.Node, key string) (*yaml.Node, error) {
	if cur := mappingChild(parent, key); cur != nil {
		if cur.Kind == yaml.SequenceNode {
			return cur, nil
		}
		return nil, fmt.Errorf("%s is a %v, not a sequence", key, cur.Kind)
	}
	keyNode := &yaml.Node{Kind: yaml.ScalarNode, Tag: "!!str", Value: key}
	valNode := &yaml.Node{Kind: yaml.SequenceNode, Tag: "!!seq"}
	parent.Content = append(parent.Content, keyNode, valNode)
	return valNode, nil
}

// sequenceAt navigates dotted path from root, returning the sequence node.
// When create is true, empty mappings and a final sequence are inserted along
// the path so the caller always gets a writable slice.
func sequenceAt(root *yaml.Node, path string, create bool) (*yaml.Node, error) {
	segments := strings.Split(path, ".")
	var parent *yaml.Node
	switch root.Kind {
	case yaml.DocumentNode:
		parent = root
		if len(parent.Content) == 0 {
			if !create {
				return nil, fmt.Errorf("empty document")
			}
			parent.Content = append(parent.Content, &yaml.Node{Kind: yaml.MappingNode, Tag: "!!map"})
		}
		parent = parent.Content[0]
	default:
		parent = root
	}
	for _, seg := range segments[:len(segments)-1] {
		child, err := ensureMapping(parent, seg)
		if err != nil {
			return nil, err
		}
		parent = child
	}
	last := segments[len(segments)-1]
	return ensureSequence(parent, last)
}

// CollectionCount returns the number of items in the list at path.
func CollectionCount(data, path string) (int, error) {
	root, err := parseDoc(data)
	if err != nil {
		return 0, err
	}
	seq, err := sequenceAt(root, path, false)
	if err != nil {
		return 0, err
	}
	return len(seq.Content), nil
}

// AddItem appends an empty item described by template (a nested map or
// nil for scalar lists) to the sequence at path.
func AddItem(data, path string, template map[string]any) (string, error) {
	return appendItem(data, path, template, -1)
}

func appendItem(data, path string, template map[string]any, before int) (string, error) {
	root, err := parseDoc(data)
	if err != nil {
		return "", err
	}
	seq, err := sequenceAt(root, path, true)
	if err != nil {
		return "", err
	}
	item := itemFromTemplate(template)
	if before >= 0 && before <= len(seq.Content) {
		seq.Content = append(seq.Content[:before+1], seq.Content[before:]...)
		seq.Content[before] = item
	} else {
		seq.Content = append(seq.Content, item)
	}
	return encodeDoc(root)
}

// RemoveItem removes the item at idx from the sequence at path.
func RemoveItem(data, path string, idx int) (string, error) {
	root, err := parseDoc(data)
	if err != nil {
		return "", err
	}
	seq, err := sequenceAt(root, path, false)
	if err != nil {
		return "", err
	}
	if idx < 0 || idx >= len(seq.Content) {
		return "", fmt.Errorf("index %d out of range [0, %d)", idx, len(seq.Content))
	}
	seq.Content = append(seq.Content[:idx], seq.Content[idx+1:]...)
	return encodeDoc(root)
}

// MoveItem moves the item at idx by delta steps (e.g. -1 up, +1 down).
func MoveItem(data, path string, idx, delta int) (string, error) {
	root, err := parseDoc(data)
	if err != nil {
		return "", err
	}
	seq, err := sequenceAt(root, path, false)
	if err != nil {
		return "", err
	}
	if idx < 0 || idx >= len(seq.Content) {
		return "", fmt.Errorf("index %d out of range [0, %d)", idx, len(seq.Content))
	}
	target := idx + delta
	if target < 0 || target >= len(seq.Content) {
		return data, nil // out of bounds — no-op
	}
	seq.Content[target], seq.Content[idx] = seq.Content[idx], seq.Content[target]
	return encodeDoc(root)
}

// GetItem returns the item at idx flattened to dotted scalar leaf paths.
func GetItem(data, path string, idx int) (map[string]string, error) {
	root, err := parseDoc(data)
	if err != nil {
		return nil, err
	}
	seq, err := sequenceAt(root, path, false)
	if err != nil {
		return nil, err
	}
	if idx < 0 || idx >= len(seq.Content) {
		return nil, fmt.Errorf("index %d out of range [0, %d)", idx, len(seq.Content))
	}
	return readItemFlat(seq.Content[idx], ""), nil
}

// SetItem replaces the item at idx with a node built from dotted values
// applied to template.
func SetItem(data, path string, idx int, template map[string]any, values map[string]string) (string, error) {
	root, err := parseDoc(data)
	if err != nil {
		return "", err
	}
	seq, err := sequenceAt(root, path, false)
	if err != nil {
		return "", err
	}
	if idx < 0 || idx >= len(seq.Content) {
		return "", fmt.Errorf("index %d out of range [0, %d)", idx, len(seq.Content))
	}
	seq.Content[idx] = itemFromValues(template, values)
	return encodeDoc(root)
}

// setPathValues walks dotted paths and sets each scalar value in the
// document. Unknown intermediate paths are created as mappings.
func setPathValues(data string, values map[string]string) (string, error) {
	root, err := parseDoc(data)
	if err != nil {
		return "", err
	}
	for dotted, val := range values {
		setLeaf(root, dotted, val)
	}
	return encodeDoc(root)
}

func setLeaf(root *yaml.Node, dotted, value string) {
	segments := strings.Split(dotted, ".")
	m := root
	if m.Kind == yaml.DocumentNode {
		if len(m.Content) == 0 {
			m.Content = append(m.Content, &yaml.Node{Kind: yaml.MappingNode, Tag: "!!map"})
		}
		m = m.Content[0]
	}
	cur := m
	for _, seg := range segments[:len(segments)-1] {
		next := mappingChild(cur, seg)
		if next == nil {
			kn := &yaml.Node{Kind: yaml.ScalarNode, Tag: "!!str", Value: seg}
			vn := &yaml.Node{Kind: yaml.MappingNode, Tag: "!!map"}
			cur.Content = append(cur.Content, kn, vn)
			cur = vn
			continue
		}
		if next.Kind != yaml.MappingNode {
			return
		}
		cur = next
	}
	last := segments[len(segments)-1]
	if old := mappingChild(cur, last); old != nil && old.Kind == yaml.ScalarNode {
		old.Value = value
		return
	}
	kn := &yaml.Node{Kind: yaml.ScalarNode, Tag: "!!str", Value: last}
	vn := &yaml.Node{Kind: yaml.ScalarNode, Tag: "!!str", Value: value}
	cur.Content = append(cur.Content, kn, vn)
}

// itemFromTemplate builds an item node from a template. A nil template
// produces a scalar empty string.
func itemFromTemplate(template map[string]any) *yaml.Node {
	if template == nil {
		return &yaml.Node{Kind: yaml.ScalarNode, Tag: "!!str", Value: ""}
	}
	n := &yaml.Node{Kind: yaml.MappingNode, Tag: "!!map"}
	for k, v := range template {
		n.Content = append(n.Content,
			&yaml.Node{Kind: yaml.ScalarNode, Tag: "!!str", Value: k},
			anyToNode(v))
	}
	return n
}

// itemFromValues applies flat dotted scalar values to a template and returns
// the built item node.
func itemFromValues(template map[string]any, values map[string]string) *yaml.Node {
	if template == nil {
		if v, ok := values[""]; ok {
			return &yaml.Node{Kind: yaml.ScalarNode, Tag: "!!str", Value: v}
		}
		return &yaml.Node{Kind: yaml.ScalarNode, Tag: "!!str", Value: ""}
	}
	nested := anyToStringMap(template)
	for k, v := range values {
		setNested(nested, k, v)
	}
	return itemFromTemplate(nested)
}

func anyToNode(v any) *yaml.Node {
	switch t := v.(type) {
	case map[string]any:
		n := &yaml.Node{Kind: yaml.MappingNode, Tag: "!!map"}
		for k, val := range t {
			n.Content = append(n.Content,
				&yaml.Node{Kind: yaml.ScalarNode, Tag: "!!str", Value: k},
				anyToNode(val))
		}
		return n
	case string:
		return &yaml.Node{Kind: yaml.ScalarNode, Tag: "!!str", Value: t}
	default:
		return &yaml.Node{Kind: yaml.ScalarNode, Tag: "!!str", Value: fmt.Sprintf("%v", t)}
	}
}

func anyToStringMap(v map[string]any) map[string]any {
	out := make(map[string]any, len(v))
	for k, val := range v {
		switch t := val.(type) {
		case map[string]any:
			out[k] = anyToStringMap(t)
		default:
			out[k] = val
		}
	}
	return out
}

func setNested(m map[string]any, dotted, value string) {
	segments := strings.Split(dotted, ".")
	cur := m
	for _, seg := range segments[:len(segments)-1] {
		next, _ := cur[seg].(map[string]any)
		if next == nil {
			next = map[string]any{}
			cur[seg] = next
		}
		cur = next
	}
	cur[segments[len(segments)-1]] = value
}

func readItemFlat(n *yaml.Node, prefix string) map[string]string {
	out := map[string]string{}
	flatten(n, prefix, &out)
	return out
}

func flatten(n *yaml.Node, prefix string, out *map[string]string) {
	switch n.Kind {
	case yaml.MappingNode:
		for i := 0; i+1 < len(n.Content); i += 2 {
			key := n.Content[i].Value
			p := key
			if prefix != "" {
				p = prefix + "." + key
			}
			flatten(n.Content[i+1], p, out)
		}
	case yaml.SequenceNode:
		for i, c := range n.Content {
			p := fmt.Sprintf("%s[%d]", prefix, i)
			flatten(c, p, out)
		}
	case yaml.ScalarNode:
		(*out)[prefix] = n.Value
	}
}
