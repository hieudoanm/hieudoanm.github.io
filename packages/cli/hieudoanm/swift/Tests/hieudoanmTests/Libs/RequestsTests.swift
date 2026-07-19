import XCTest
@testable import hieudoanm

final class RequestsTests: XCTestCase {
    func testHTTPMethod_rawValues() {
        XCTAssertEqual(HTTPMethod.get.rawValue, "GET")
        XCTAssertEqual(HTTPMethod.post.rawValue, "POST")
        XCTAssertEqual(HTTPMethod.put.rawValue, "PUT")
        XCTAssertEqual(HTTPMethod.delete.rawValue, "DELETE")
    }

    func testRequestError_withStatusCode() {
        let err = RequestError(message: "Not found", statusCode: 404)
        XCTAssertEqual(err.description, "HTTP 404: Not found")
    }

    func testRequestError_withoutStatusCode() {
        let err = RequestError(message: "Something broke", statusCode: nil)
        XCTAssertEqual(err.description, "Something broke")
    }

    func testHTTPResponse_init() {
        let data = "hello".data(using: .utf8)!
        let headers = ["Content-Type": "text/plain"]
        let resp = HTTPResponse(data: data, statusCode: 200, headers: headers)
        XCTAssertEqual(resp.statusCode, 200)
        XCTAssertEqual(resp.headers["Content-Type"], "text/plain")
        XCTAssertEqual(String(data: resp.data, encoding: .utf8), "hello")
    }

    func testBuildURL_noQuery() {
        let url = Requests.buildURL("https://example.com", query: [:])
        XCTAssertEqual(url, "https://example.com")
    }

    func testBuildURL_withQuery() {
        let url = Requests.buildURL("https://example.com/api", query: ["q": "test", "page": "1"])
        XCTAssertTrue(url.hasPrefix("https://example.com/api?"))
        XCTAssertTrue(url.contains("q=test"))
        XCTAssertTrue(url.contains("page=1"))
    }

    func testBuildURL_withExistingQuery() {
        let url = Requests.buildURL("https://example.com/api?existing=true", query: ["q": "test"])
        XCTAssertTrue(url.contains("existing=true"))
        XCTAssertTrue(url.contains("q=test"))
    }

    func testBuildURL_invalidBase() {
        let url = Requests.buildURL("not a url", query: ["k": "v"])
        XCTAssertTrue(url.contains("k=v"))
    }
}
