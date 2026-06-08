import Foundation

struct ShopifyResult {
    let isShopify: Bool
    let isPlus: Bool
    let storeName: String?
    let via: String
}

func detectShopify(url: String) async throws -> ShopifyResult {
    var options = RequestsOptions()
    options.timeout = 15

    let data = try await requestsFetch(method: "GET", url: url, options: options)
    let body = String(data: data, encoding: .utf8) ?? ""

    if body.contains("x-shopify-plus") || body.contains("cdn.shopify.com") {
        return ShopifyResult(isShopify: true, isPlus: body.contains("x-shopify-plus"), storeName: nil, via: "html")
    }

    if body.contains("shopify-section") || body.contains("shopify-digital-wallet") {
        return ShopifyResult(isShopify: true, isPlus: body.contains("shopify-plus"), storeName: nil, via: "html")
    }

    return ShopifyResult(isShopify: false, isPlus: false, storeName: nil, via: "none")
}
