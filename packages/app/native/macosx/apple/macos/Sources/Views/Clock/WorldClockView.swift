import MacOSXCore
import SwiftUI

/// Searchable list of city times with live weather fetched from Open-Meteo.
struct WorldClockView: View {
    @ObservedObject var viewModel: WorldClockViewModel

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            searchField

            Divider()

            if rows.isEmpty {
                emptyState
            } else {
                cityList
            }

            Divider()

            credit
        }
        .task {
            viewModel.start()
        }
        .onDisappear {
            viewModel.stop()
        }
    }

    private var rows: [CityRow] {
        viewModel.cityRows()
    }

    private var searchField: some View {
        HStack(spacing: 6) {
            Image(systemName: "magnifyingglass")
                .foregroundColor(.secondary)
                .accessibilityHidden(true)
            TextField("Search cities…", text: $viewModel.searchQuery)
                .textFieldStyle(.plain)
            if !viewModel.searchQuery.isEmpty {
                Button {
                    viewModel.searchQuery = ""
                } label: {
                    Image(systemName: "xmark.circle.fill")
                        .foregroundColor(.secondary)
                        .accessibilityLabel("Clear search")
                }
                .buttonStyle(.borderless)
                .help("Clear search")
            }
        }
        .padding(.vertical, 8)
    }

    private var cityList: some View {
        ScrollView {
            LazyVStack(alignment: .leading, spacing: 0) {
                ForEach(rows) { row in
                    CityClockRow(
                        city: row.city,
                        time: viewModel.times[row.index],
                        weather: viewModel.weather[row.index]
                    )
                    if row.id != rows.last?.id {
                        Divider()
                    }
                }
            }
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .top)
    }

    private var emptyState: some View {
        VStack(spacing: 8) {
            Image(systemName: "globe")
                .font(.system(size: 28, weight: .regular))
                .foregroundColor(.secondary)
                .accessibilityHidden(true)
            Text("No cities match \"\(viewModel.searchQuery)\"")
                .font(.caption)
                .foregroundColor(.secondary)
                .multilineTextAlignment(.center)
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 40)
        .accessibilityElement(children: .combine)
    }

    private var credit: some View {
        Text("Weather via Open-Meteo · 10 min")
            .font(.system(.caption2, design: .monospaced))
            .tracking(1)
            .foregroundColor(Color.secondary.opacity(0.6))
            .frame(maxWidth: .infinity)
            .padding(.vertical, 6)
    }
}

private struct CityClockRow: View {
    let city: ClockCity
    let time: String
    let weather: WeatherSample?

    var body: some View {
        HStack {
            VStack(alignment: .leading, spacing: 2) {
                HStack(spacing: 6) {
                    Text(city.label.uppercased())
                        .font(.caption2)
                        .tracking(1)
                        .foregroundColor(Color.primary.opacity(0.6))
                    Text(city.country)
                        .font(.caption2)
                        .foregroundColor(Color.secondary.opacity(0.4))
                }
                Text(time)
                    .font(.system(.title3, design: .monospaced))
                    .monospacedDigit()
                    .foregroundColor(.primary)
                    .animation(.linear(duration: 1), value: time)
            }

            Spacer()

            WeatherBadgeView(weather: weather)
        }
        .padding(.vertical, 8)
        .accessibilityElement(children: .combine)
        .accessibilityLabel(
            "\(city.label), \(time), "
                + (weather.map { "\(Int($0.temperatureCelsius.rounded()))°C, \($0.conditionText)" }
                    ?? "weather unavailable")
        )
    }
}

private struct WeatherBadgeView: View {
    let weather: WeatherSample?

    var body: some View {
        if let weather {
            VStack(alignment: .trailing, spacing: 2) {
                Text("\(Int(weather.temperatureCelsius.rounded()))°C")
                    .font(.system(.title3, design: .monospaced))
                    .monospacedDigit()
                Text(weather.conditionText)
                    .font(.caption2)
                    .foregroundColor(.secondary)
            }
        } else {
            Text("…")
                .font(.caption)
                .foregroundColor(.secondary)
                .frame(width: 60, alignment: .trailing)
        }
    }
}