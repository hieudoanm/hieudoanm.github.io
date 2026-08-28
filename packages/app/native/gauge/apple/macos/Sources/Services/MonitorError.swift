import Foundation

public enum MonitorError: Error {
    case unableToReadMemory
    case unableToReadSwap
    case unableToReadCPU
    case unavailableFileSystem
}