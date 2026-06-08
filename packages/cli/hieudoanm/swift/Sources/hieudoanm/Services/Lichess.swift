import Foundation

struct CloudEval: Codable {
    let fen: String
    let knodes: Int?
    let depth: Int?
    let pvs: [PV]?
}

struct PV: Codable {
    let moves: String?
    let cp: Int?
    let mate: Int?
}

func cloudEval(fen: String, variant: String = "standard") async throws -> CloudEval? {
    let url = "https://explorer.lichess.ovh/masters"
    var options = RequestsOptions()
    options.query["fen"] = fen
    options.query["variant"] = variant

    let data = try await requestsFetch(method: "GET", url: url, options: options)
    return try JSONDecoder().decode(CloudEval.self, from: data)
}
