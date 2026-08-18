use rusqlite::Connection;
use serde::{Deserialize, Serialize};
use serde_json::Value;
use std::time::Duration;

const CLIENT_TIMEOUT: Duration = Duration::from_secs(30);
const DICOM_JSON_ACCEPT: &str = "application/dicom+json";
const DCM_PART_TYPE: &str = "application/dicom";

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct DicomwebServer {
  pub id: String,
  pub name: String,
  pub url: String,
  pub auth_header: String,
  pub created_at: i64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct QidoStudy {
  pub study_uid: String,
  pub patient_name: String,
  pub study_date: String,
  pub study_description: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct QidoSeries {
  pub series_uid: String,
  pub series_description: String,
  pub modality: String,
  pub instance_count: i64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct StowResult {
  pub stored: usize,
  pub failed: usize,
}

pub fn validate_server(name: &str, url: &str) -> Result<(), String> {
  if name.trim().is_empty() {
    return Err("server name is required".to_string());
  }
  let trimmed = url.trim();
  let without_scheme = trimmed
    .strip_prefix("https://")
    .or_else(|| trimmed.strip_prefix("http://"))
    .ok_or_else(|| "DICOMweb servers must use http or https".to_string())?;
  let host_end = without_scheme
    .find(['/', '?', '#'])
    .unwrap_or(without_scheme.len());
  let authority = &without_scheme[..host_end];
  let has_host = authority
    .split('@')
    .next_back()
    .map(|host| {
      let name_part = host.split(':').next().unwrap_or_default();
      !name_part.trim().is_empty()
    })
    .unwrap_or(false);
  if !has_host {
    return Err("server url needs a host".to_string());
  }
  Ok(())
}

const SERVER_COLUMNS: &str = "id, name, url, auth_header, created_at";

fn row_to_server(row: &rusqlite::Row<'_>) -> rusqlite::Result<DicomwebServer> {
  Ok(DicomwebServer {
    id: row.get(0)?,
    name: row.get(1)?,
    url: row.get(2)?,
    auth_header: row.get(3)?,
    created_at: row.get(4)?,
  })
}

pub fn insert_server(connection: &Connection, server: &DicomwebServer) -> Result<(), String> {
  connection
    .execute(
      &format!("INSERT INTO dicomweb_servers ({SERVER_COLUMNS}) VALUES (?1,?2,?3,?4,?5)"),
      rusqlite::params![
        server.id,
        server.name,
        server.url,
        server.auth_header,
        server.created_at
      ],
    )
    .map_err(|error| error.to_string())?;
  Ok(())
}

pub fn list_servers(connection: &Connection) -> Result<Vec<DicomwebServer>, String> {
  let mut statement = connection
    .prepare(&format!(
      "SELECT {SERVER_COLUMNS} FROM dicomweb_servers ORDER BY created_at"
    ))
    .map_err(|error| error.to_string())?;
  let rows = statement
    .query_map([], row_to_server)
    .map_err(|error| error.to_string())?;
  rows.collect::<Result<Vec<_>, _>>().map_err(|e| e.to_string())
}

pub fn get_server(connection: &Connection, id: &str) -> Result<DicomwebServer, String> {
  connection
    .query_row(
      &format!("SELECT {SERVER_COLUMNS} FROM dicomweb_servers WHERE id = ?1"),
      [id],
      row_to_server,
    )
    .map_err(|error| error.to_string())
}

pub fn delete_server(connection: &Connection, id: &str) -> Result<(), String> {
  connection
    .execute("DELETE FROM dicomweb_servers WHERE id = ?1", [id])
    .map_err(|error| error.to_string())?;
  Ok(())
}

/// Percent-encodes a query value; UIDs and names stay readable.
pub fn percent_encode(value: &str) -> String {
  let mut encoded = String::new();
  for byte in value.bytes() {
    match byte {
      b'A'..=b'Z' | b'a'..=b'z' | b'0'..=b'9' | b'-' | b'.' | b'_' | b'~' => {
        encoded.push(byte as char);
      }
      _ => encoded.push_str(&format!("%{byte:02X}")),
    }
  }
  encoded
}

pub fn extract_boundary(content_type: &str) -> Result<String, String> {
  for parameter in content_type.split(';') {
    let parameter = parameter.trim();
    if let Some(value) = parameter.strip_prefix("boundary=") {
      return Ok(value.trim_matches('"').to_string());
    }
  }
  Err("multipart response is missing a boundary".to_string())
}

/// Extracts the payload of the first part from a multipart/related body.
pub fn first_multipart_part(body: &[u8], boundary: &str) -> Result<Vec<u8>, String> {
  let marker = format!("--{boundary}");
  let delimiter = format!("\r\n{marker}");
  let start = if body.starts_with(marker.as_bytes()) {
    0
  } else {
    body
      .windows(delimiter.len())
      .position(|window| window == delimiter.as_bytes())
      .ok_or_else(|| "multipart body has no boundary".to_string())?
      + 2
  };
  let rest = &body[start + marker.len()..];
  // Skip the trailing -- of a closing delimiter.
  let rest = rest.strip_prefix(b"--").unwrap_or(rest);
  let header_end = rest
    .windows(4)
    .position(|window| window == b"\r\n\r\n")
    .ok_or_else(|| "multipart part has no header terminator".to_string())?;
  let payload_start = header_end + 4;
  let payload_end = rest[payload_start..]
    .windows(delimiter.len())
    .position(|window| window == delimiter.as_bytes())
    .map(|offset| payload_start + offset)
    .ok_or_else(|| "multipart part is not terminated".to_string())?;
  Ok(rest[payload_start..payload_end].to_vec())
}

/// Builds a multipart/related body for STOW-RS uploads.
pub fn build_stow_body(parts: &[Vec<u8>], boundary: &str) -> Vec<u8> {
  let mut body = Vec::new();
  for part in parts {
    body.extend_from_slice(format!("--{boundary}\r\n").as_bytes());
    body.extend_from_slice(
      format!(
        "Content-Type: {DCM_PART_TYPE}\r\nContent-Length: {}\r\n\r\n",
        part.len()
      )
      .as_bytes(),
    );
    body.extend_from_slice(part);
    body.extend_from_slice(b"\r\n");
  }
  body.extend_from_slice(format!("--{boundary}--\r\n").as_bytes());
  body
}

fn dicom_json_string(entry: &Value, tag: &str) -> String {
  entry
    .get(tag)
    .and_then(|attribute| attribute.get("Value"))
    .and_then(|values| values.get(0))
    .and_then(|value| value.as_str())
    .unwrap_or_default()
    .to_string()
}

fn dicom_json_number(entry: &Value, tag: &str) -> i64 {
  entry
    .get(tag)
    .and_then(|attribute| attribute.get("Value"))
    .and_then(|values| values.get(0))
    .and_then(|value| {
      value
        .as_i64()
        .or_else(|| value.as_str().and_then(|text| text.parse().ok()))
    })
    .unwrap_or(0)
}

struct Client {
  agent: ureq::Agent,
  base: String,
  auth_header: String,
}

impl Client {
  fn new(server: &DicomwebServer) -> Self {
    Self {
      agent: ureq::Agent::config_builder()
        .timeout_global(Some(CLIENT_TIMEOUT))
        .build()
        .new_agent(),
      base: server.url.trim_end_matches('/').to_string(),
      auth_header: server.auth_header.clone(),
    }
  }

  fn get(
    &self,
    path: &str,
    accept: &str,
  ) -> Result<ureq::http::Response<ureq::Body>, String> {
    let builder = self
      .agent
      .get(&format!("{}{path}", self.base))
      .header("Accept", accept);
    self.with_auth(builder).call().map_err(|error| error.to_string())
  }

  fn post(
    &self,
    path: &str,
    content_type: &str,
    body: Vec<u8>,
  ) -> Result<ureq::http::Response<ureq::Body>, String> {
    let builder = self
      .agent
      .post(&format!("{}{path}", self.base))
      .header("Content-Type", content_type);
    self
      .with_auth(builder)
      .send(body)
      .map_err(|error| error.to_string())
  }

  fn with_auth<B>(
    &self,
    builder: ureq::RequestBuilder<B>,
  ) -> ureq::RequestBuilder<B> {
    if self.auth_header.is_empty() {
      builder
    } else {
      builder.header("Authorization", self.auth_header.as_str())
    }
  }
}

fn parse_json_array(body: &str) -> Result<Vec<Value>, String> {
  let parsed: Value =
    serde_json::from_str(body).map_err(|error| format!("invalid DICOM JSON: {error}"))?;
  Ok(match parsed {
    Value::Array(items) => items,
    _ => Vec::new(),
  })
}

/// QIDO-RS: search studies, optionally filtered by patient name.
pub fn qido_studies(
  server: &DicomwebServer,
  patient_name: &str,
  limit: u32,
) -> Result<Vec<QidoStudy>, String> {
  let client = Client::new(server);
  let mut path = format!("/studies?limit={limit}");
  if !patient_name.trim().is_empty() {
    path.push_str(&format!("&PatientName={}", percent_encode(patient_name)));
  }
  let response = client.get(&path, DICOM_JSON_ACCEPT)?;
  let body = response
    .into_body()
    .read_to_string()
    .map_err(|error| error.to_string())?;
  let entries = parse_json_array(&body)?;
  Ok(entries
    .iter()
    .map(|entry| QidoStudy {
      study_uid: dicom_json_string(entry, "0020000D"),
      patient_name: dicom_json_string(entry, "00100010"),
      study_date: dicom_json_string(entry, "00080020"),
      study_description: dicom_json_string(entry, "00081030"),
    })
    .collect())
}

/// QIDO-RS: list the series of one study.
pub fn qido_series(server: &DicomwebServer, study_uid: &str) -> Result<Vec<QidoSeries>, String> {
  let client = Client::new(server);
  let response = client.get(&format!("/studies/{study_uid}/series"), DICOM_JSON_ACCEPT)?;
  let body = response
    .into_body()
    .read_to_string()
    .map_err(|error| error.to_string())?;
  let entries = parse_json_array(&body)?;
  Ok(entries
    .iter()
    .map(|entry| QidoSeries {
      series_uid: dicom_json_string(entry, "0020000E"),
      series_description: dicom_json_string(entry, "0008103E"),
      modality: dicom_json_string(entry, "00080060"),
      instance_count: dicom_json_number(entry, "00201208"),
    })
    .collect())
}

/// QIDO-RS: SOP instance UIDs of one series (capped by `limit`).
pub fn qido_instance_uids(
  server: &DicomwebServer,
  study_uid: &str,
  series_uid: &str,
  limit: u32,
) -> Result<Vec<String>, String> {
  let client = Client::new(server);
  let path = format!("/studies/{study_uid}/series/{series_uid}/instances?limit={limit}");
  let response = client.get(&path, DICOM_JSON_ACCEPT)?;
  let body = response
    .into_body()
    .read_to_string()
    .map_err(|error| error.to_string())?;
  let entries = parse_json_array(&body)?;
  Ok(entries
    .iter()
    .map(|entry| dicom_json_string(entry, "00080018"))
    .filter(|uid| !uid.is_empty())
    .collect())
}

/// WADO-RS: retrieve one DICOM instance as raw bytes.
pub fn wado_instance(
  server: &DicomwebServer,
  study_uid: &str,
  series_uid: &str,
  sop_uid: &str,
) -> Result<Vec<u8>, String> {
  let client = Client::new(server);
  let path = format!("/studies/{study_uid}/series/{series_uid}/instances/{sop_uid}");
  let response =
    client.get(&path, "multipart/related; type=\"application/dicom\"")?;
  let content_type = response
    .headers()
    .get("content-type")
    .and_then(|value| value.to_str().ok())
    .unwrap_or_default()
    .to_string();
  let body = response
    .into_body()
    .read_to_vec()
    .map_err(|error| error.to_string())?;
  let boundary = extract_boundary(&content_type)?;
  first_multipart_part(&body, &boundary)
}

/// STOW-RS: store instances on the remote server.
pub fn stow_instances(
  server: &DicomwebServer,
  study_uid: Option<&str>,
  parts: &[Vec<u8>],
) -> Result<StowResult, String> {
  if parts.is_empty() {
    return Err("no instances to store".to_string());
  }
  let client = Client::new(server);
  let boundary = format!("mri-stow-{}", uuid::Uuid::new_v4());
  let path = match study_uid {
    Some(uid) => format!("/studies/{uid}"),
    None => "/studies".to_string(),
  };
  let content_type =
    format!("multipart/related; type=\"{DCM_PART_TYPE}\"; boundary={boundary}");
  let response = client.post(&path, &content_type, build_stow_body(parts, &boundary))?;
  let status = response.status().as_u16();
  if !(200..300).contains(&status) {
    return Err(format!("STOW failed with status {status}"));
  }
  let body = response
    .into_body()
    .read_to_string()
    .map_err(|error| error.to_string())?;
  let stored = parse_json_array(&body)
    .ok()
    .and_then(|entries| entries.first().cloned())
    .map(|report| {
      report
        .get("00081199")
        .and_then(|sequence| sequence.get("Value"))
        .and_then(|value| value.as_array())
        .map(|items| items.len())
        .unwrap_or(parts.len())
    })
    .unwrap_or(parts.len());
  Ok(StowResult {
    stored,
    failed: parts.len().saturating_sub(stored),
  })
}

#[cfg(test)]
mod tests {
  use super::*;
  use crate::db;
  use std::io::{Read as _, Write as _};
  use std::net::TcpListener;
  use std::sync::mpsc::Receiver;

  fn server_fixture(name: &str, url: &str) -> DicomwebServer {
    DicomwebServer {
      id: format!("server://{name}"),
      name: name.to_string(),
      url: url.to_string(),
      auth_header: String::new(),
      created_at: db::now(),
    }
  }

  /// Serves one canned HTTP response and captures the raw request bytes.
  fn serve_once(response: Vec<u8>) -> (String, Receiver<Vec<u8>>) {
    let listener = TcpListener::bind("127.0.0.1:0").unwrap();
    let address = listener.local_addr().unwrap();
    let (sender, receiver) = std::sync::mpsc::channel();
    std::thread::spawn(move || {
      let Ok((mut stream, _)) = listener.accept() else {
        return;
      };
      let mut request = Vec::new();
      let mut buffer = [0u8; 4096];
      loop {
        match stream.read(&mut buffer) {
          Ok(0) | Err(_) => break,
          Ok(read) => {
            request.extend_from_slice(&buffer[..read]);
            let Some(header_end) = request
              .windows(4)
              .position(|window| window == b"\r\n\r\n")
              .map(|position| position + 4)
            else {
              continue;
            };
            let headers = String::from_utf8_lossy(&request[..header_end]).to_lowercase();
            let length = headers
              .lines()
              .find_map(|line| line.strip_prefix("content-length:"))
              .and_then(|value| value.trim().parse::<usize>().ok())
              .unwrap_or(0);
            if request.len() >= header_end + length {
              break;
            }
          }
        }
      }
      let _ = sender.send(request);
      let _ = stream.write_all(&response);
    });
    (format!("http://{address}"), receiver)
  }

  fn http_ok(content_type: &str, body: &[u8]) -> Vec<u8> {
    let mut response = format!(
      "HTTP/1.1 200 OK\r\nContent-Type: {content_type}\r\nContent-Length: {}\r\nConnection: close\r\n\r\n",
      body.len()
    )
    .into_bytes();
    response.extend_from_slice(body);
    response
  }

  #[test]
  fn validates_server_name_and_url() {
    assert!(validate_server("PACS", "http://pacs.local/dicom-web").is_ok());
    assert!(validate_server("PACS", "https://pacs.local").is_ok());
    assert!(validate_server("", "http://pacs.local").is_err());
    assert!(validate_server("PACS", "ftp://pacs.local").is_err());
    assert!(validate_server("PACS", "http://").is_err());
    assert!(validate_server("PACS", "not a url").is_err());
  }

  #[test]
  fn percent_encodes_query_values() {
    assert_eq!(percent_encode("ANON^A"), "ANON%5EA");
    assert_eq!(percent_encode("Brain MR"), "Brain%20MR");
    assert_eq!(percent_encode("1.2.3"), "1.2.3");
  }

  #[test]
  fn extracts_boundaries_from_content_type() {
    assert_eq!(
      extract_boundary("multipart/related; type=\"application/dicom\"; boundary=abc123").unwrap(),
      "abc123"
    );
    assert_eq!(
      extract_boundary("multipart/related; boundary=\"quoted\"").unwrap(),
      "quoted"
    );
    assert!(extract_boundary("application/dicom+json").is_err());
  }

  #[test]
  fn parses_first_multipart_part_with_binary_payload() {
    let payload: Vec<u8> = [128u8, 0, 68, 73, 67, 77, 13, 10, 45, 45].to_vec();
    let mut body = b"preamble\r\n--B\r\nContent-Type: application/dicom\r\n\r\n".to_vec();
    body.extend_from_slice(&payload);
    body.extend_from_slice(b"\r\n--B\r\nContent-Type: application/dicom\r\n\r\nsecond\r\n--B--\r\n");
    assert_eq!(first_multipart_part(&body, "B").unwrap(), payload);
    assert!(first_multipart_part(b"no boundary here", "B").is_err());
  }

  #[test]
  fn builds_stow_body_with_delimiters() {
    let body = build_stow_body(&[vec![1, 2], vec![3]], "bnd");
    let text = String::from_utf8_lossy(&body);
    assert!(text.starts_with("--bnd\r\n"));
    assert!(text.contains("Content-Type: application/dicom\r\nContent-Length: 2\r\n\r\n"));
    assert!(text.ends_with("\r\n--bnd--\r\n"));
  }

  #[test]
  fn qido_studies_parses_dicom_json_and_sends_query() {
    let json = r#"[{"0020000D":{"Value":["1.2.3"]},"00100010":{"Value":["DOE^JOHN"]},"00080020":{"Value":["20240115"]},"00081030":{"Value":["MR BRAIN"]}}]"#;
    let (url, requests) = serve_once(http_ok("application/dicom+json", json.as_bytes()));
    let studies =
      qido_studies(&server_fixture("pacs", &url), "DOE^A", 25).expect("qido studies");
    assert_eq!(studies.len(), 1);
    assert_eq!(studies[0].study_uid, "1.2.3");
    assert_eq!(studies[0].patient_name, "DOE^JOHN");
    assert_eq!(studies[0].study_date, "20240115");
    assert_eq!(studies[0].study_description, "MR BRAIN");
    let request = requests.recv().unwrap();
    let request = String::from_utf8_lossy(&request).to_lowercase();
    assert!(request.starts_with("get /studies?limit=25&patientname=doe%5ea"));
    assert!(request.contains("accept: application/dicom+json"));
  }

  #[test]
  fn qido_series_maps_tags() {
    let json = r#"[{"0020000E":{"Value":["4.5.6"]},"0008103E":{"Value":["T1 MPRAGE"]},"00080060":{"Value":["MR"]},"00201208":{"Value":[176]}}]"#;
    let (url, _) = serve_once(http_ok("application/dicom+json", json.as_bytes()));
    let series = qido_series(&server_fixture("pacs", &url), "1.2.3").expect("qido series");
    assert_eq!(series.len(), 1);
    assert_eq!(series[0].series_uid, "4.5.6");
    assert_eq!(series[0].series_description, "T1 MPRAGE");
    assert_eq!(series[0].modality, "MR");
    assert_eq!(series[0].instance_count, 176);
  }

  #[test]
  fn qido_instance_uids_filters_empty_uids() {
    let json = r#"[{"00080018":{"Value":["7.8.9"]}},{"00080018":{}}]"#;
    let (url, _) = serve_once(http_ok("application/dicom+json", json.as_bytes()));
    let uids = qido_instance_uids(&server_fixture("pacs", &url), "1.2", "4.5", 10)
      .expect("qido instances");
    assert_eq!(uids, vec!["7.8.9"]);
  }

  #[test]
  fn wado_instance_extracts_dicom_part() {
    let payload: Vec<u8> = [0x42, 0x4d, 13, 10, 255, 0].to_vec();
    let mut body = b"--xyz\r\nContent-Type: application/dicom\r\nContent-Length: 6\r\n\r\n".to_vec();
    body.extend_from_slice(&payload);
    body.extend_from_slice(b"\r\n--xyz--\r\n");
    let (url, requests) = serve_once(http_ok(
      "multipart/related; type=\"application/dicom\"; boundary=xyz",
      &body,
    ));
    let instance = wado_instance(&server_fixture("pacs", &url), "1.2", "4.5", "7.8")
      .expect("wado instance");
    assert_eq!(instance, payload);
    let request = String::from_utf8_lossy(&requests.recv().unwrap()).to_string();
    assert!(request.starts_with("GET /studies/1.2/series/4.5/instances/7.8"));
  }

  #[test]
  fn stow_instances_posts_multipart_and_counts_stored() {
    let report = r#"[{"00081199":{"Value":[{"00081190":{"Value":["1.2"]}}]}}]"#;
    let (url, requests) = serve_once(http_ok("application/dicom+json", report.as_bytes()));
    let result = stow_instances(&server_fixture("pacs", &url), None, &[vec![1, 2, 3], vec![4]])
      .expect("stow");
    assert_eq!(result.stored, 1);
    assert_eq!(result.failed, 1);
    let request = String::from_utf8_lossy(&requests.recv().unwrap()).to_string();
    assert!(request.starts_with("POST /studies"));
    assert!(request.contains("multipart/related"));
    assert!(request.contains("--mri-stow-"));
  }

  #[test]
  fn stow_instances_rejects_empty_parts() {
    let server = server_fixture("pacs", "http://localhost");
    assert!(stow_instances(&server, None, &[]).is_err());
  }

  #[test]
  fn server_crud_roundtrip() {
    let connection = db::open_in_memory().unwrap();
    let first = server_fixture("Hospital PACS", "http://pacs.local/dicom-web");
    insert_server(&connection, &first).unwrap();
    let second = server_fixture("Research", "https://research.local");
    insert_server(&connection, &second).unwrap();

    let listed = list_servers(&connection).unwrap();
    assert_eq!(listed.len(), 2);
    assert_eq!(listed[0].name, "Hospital PACS");

    let fetched = get_server(&connection, &first.id).unwrap();
    assert_eq!(fetched.url, "http://pacs.local/dicom-web");

    delete_server(&connection, &first.id).unwrap();
    assert_eq!(list_servers(&connection).unwrap().len(), 1);
    assert!(get_server(&connection, &first.id).is_err());
  }
}
