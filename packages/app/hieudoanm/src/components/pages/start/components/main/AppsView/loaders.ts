import { ComponentType } from 'react';

type Loader = () => Promise<{
  default: ComponentType<{ onClose: () => void }>;
}>;

const loaders: Record<string, Loader> = {};

loaders['attractors'] = () =>
  import('@hieudoanm.github.io/components/pages/app/visualization/AttractorsModal').then(
    (m) => ({ default: m.AttractorsModal })
  );

loaders['blackjack'] = () =>
  import('@hieudoanm.github.io/components/pages/games/casino/Blackjack').then(
    (m) => ({ default: m.Blackjack })
  );

loaders['braille'] = () =>
  import('@hieudoanm.github.io/components/pages/app/text-convert/BrailleModal').then(
    (m) => ({ default: m.BrailleModal })
  );

loaders['calculator'] = () =>
  import('@hieudoanm.github.io/components/pages/app/calculator/Calculator').then(
    (m) => ({ default: m.Calculator })
  );

loaders['calendar-tracker'] = () =>
  import('@hieudoanm.github.io/components/pages/app/visualization/CalendarTracker').then(
    (m) => ({ default: m.CalendarTrackerModal })
  );

loaders['chat'] = () =>
  import('@hieudoanm.github.io/components/pages/app/utilities/ChatModal').then(
    (m) => ({ default: m.ChatModal })
  );

loaders['chess-board'] = () =>
  import('@hieudoanm.github.io/components/pages/games/chess/ChessBoard').then(
    (m) => ({ default: m.ChessBoard })
  );

loaders['chess-clock'] = () =>
  import('@hieudoanm.github.io/components/pages/games/chess/ChessClock').then(
    (m) => ({ default: m.ChessClock })
  );

loaders['chess-elo'] = () =>
  import('@hieudoanm.github.io/components/pages/games/chess/ChessElo').then(
    (m) => ({ default: m.ChessElo })
  );

loaders['chess-stats'] = () =>
  import('@hieudoanm.github.io/components/pages/games/chess/ChessStats').then(
    (m) => ({ default: m.ChessStats })
  );

loaders['clipboard'] = () =>
  import('@hieudoanm.github.io/components/pages/app/utilities/ClipboardModal').then(
    (m) => ({ default: m.ClipboardModal })
  );

loaders['countdown'] = () =>
  import('@hieudoanm.github.io/components/pages/app/clocks/CountdownModal').then(
    (m) => ({ default: m.CountdownModal })
  );

loaders['countries-border'] = () =>
  import('@hieudoanm.github.io/components/pages/games/countries/Border').then(
    (m) => ({ default: m.Border })
  );

loaders['countries-connection'] = () =>
  import('@hieudoanm.github.io/components/pages/games/countries/Connection').then(
    (m) => ({ default: m.Connection })
  );

loaders['countries-continents-sort'] = () =>
  import('@hieudoanm.github.io/components/pages/games/countries/ContinentsSort').then(
    (m) => ({ default: m.ContinentsSort })
  );

loaders['countries-higher-lower'] = () =>
  import('@hieudoanm.github.io/components/pages/games/countries/HigherOrLower').then(
    (m) => ({ default: m.HigherOrLower })
  );

loaders['create-zip'] = () =>
  import('@hieudoanm.github.io/components/pages/app/utilities/CreateZipModal').then(
    (m) => ({ default: m.CreateZipModal })
  );

loaders['cron'] = () =>
  import('@hieudoanm.github.io/components/pages/app/clocks/CronModal').then(
    (m) => ({ default: m.CronModal })
  );

loaders['csv-to-excel'] = () =>
  import('@hieudoanm.github.io/components/pages/app/data-csv/CsvToExcelModal').then(
    (m) => ({ default: m.CsvToExcelModal })
  );

loaders['csv-to-json'] = () =>
  import('@hieudoanm.github.io/components/pages/app/data-csv/CsvToJsonModal').then(
    (m) => ({ default: m.CsvToJsonModal })
  );

loaders['csv-to-xml'] = () =>
  import('@hieudoanm.github.io/components/pages/app/data-csv/CsvToXmlModal').then(
    (m) => ({ default: m.CsvToXmlModal })
  );

loaders['days-count'] = () =>
  import('@hieudoanm.github.io/components/pages/app/clocks/DaysCountModal').then(
    (m) => ({ default: m.DaysCountModal })
  );

loaders['dice-game'] = () =>
  import('@hieudoanm.github.io/components/pages/games/casino/DiceGame').then(
    (m) => ({ default: m.DiceGame })
  );

loaders['dino-run'] = () =>
  import('@hieudoanm.github.io/components/pages/games/arcade/DinoRun').then(
    (m) => ({ default: m.DinoRun })
  );

loaders['doi'] = () =>
  import('@hieudoanm.github.io/components/pages/app/education/DOIModal').then(
    (m) => ({ default: m.DOIModal })
  );

loaders['emoji-guesser'] = () =>
  import('@hieudoanm.github.io/components/pages/games/countries/EmojiGuesser').then(
    (m) => ({ default: m.EmojiGuesser })
  );

loaders['emojis'] = () =>
  import('@hieudoanm.github.io/components/pages/app/utilities/EmojisModal').then(
    (m) => ({ default: m.EmojisModal })
  );

loaders['english'] = () =>
  import('@hieudoanm.github.io/components/pages/app/education/EnglishModal').then(
    (m) => ({ default: m.LanguagesEnglishModal })
  );

loaders['epoch-convert'] = () =>
  import('@hieudoanm.github.io/components/pages/app/clocks/EpochConvertModal').then(
    (m) => ({ default: m.EpochConvertModal })
  );

loaders['excel-to-csv'] = () =>
  import('@hieudoanm.github.io/components/pages/app/data-excel/ExcelToCsvModal').then(
    (m) => ({ default: m.ExcelToCsvModal })
  );

loaders['excel-to-pdf'] = () =>
  import('@hieudoanm.github.io/components/pages/app/data-excel/ExcelToPdfModal').then(
    (m) => ({ default: m.ExcelToPdfModal })
  );

loaders['excel-to-xml'] = () =>
  import('@hieudoanm.github.io/components/pages/app/data-excel/ExcelToXmlModal').then(
    (m) => ({ default: m.ExcelToXmlModal })
  );

loaders['figlet'] = () =>
  import('@hieudoanm.github.io/components/pages/app/developer/FigletModal').then(
    (m) => ({ default: m.FigletModal })
  );

loaders['flag-guesser'] = () =>
  import('@hieudoanm.github.io/components/pages/games/countries/FlagGuesser').then(
    (m) => ({ default: m.FlagGuesser })
  );

loaders['flashcards'] = () =>
  import('@hieudoanm.github.io/components/pages/app/education/FlashcardsModal').then(
    (m) => ({ default: m.FlashcardsModal })
  );

loaders['game2048'] = () =>
  import('@hieudoanm.github.io/components/pages/games/puzzle/Game2048').then(
    (m) => ({ default: m.Game2048 })
  );

loaders['graph'] = () =>
  import('@hieudoanm.github.io/components/pages/app/visualization/GraphModal').then(
    (m) => ({ default: m.GraphModal })
  );

loaders['inflation'] = () =>
  import('@hieudoanm.github.io/components/pages/app/calculator/Inflation').then(
    (m) => ({ default: m.Inflation })
  );

loaders['ip'] = () =>
  import('@hieudoanm.github.io/components/pages/app/developer/IPModal').then(
    (m) => ({ default: m.IPModal })
  );

loaders['json-schema'] = () =>
  import('@hieudoanm.github.io/components/pages/app/editors/JSONSchemaModal').then(
    (m) => ({ default: m.JSONSchemaModal })
  );

loaders['json-to-csv'] = () =>
  import('@hieudoanm.github.io/components/pages/app/data-json/JsonToCsvModal').then(
    (m) => ({ default: m.JsonToCsvModal })
  );

loaders['json-to-xml'] = () =>
  import('@hieudoanm.github.io/components/pages/app/data-json/JsonToXmlModal').then(
    (m) => ({ default: m.JsonToXmlModal })
  );

loaders['kaprekar'] = () =>
  import('@hieudoanm.github.io/components/pages/app/utilities/KaprekarModal').then(
    (m) => ({ default: m.KaprekarModal })
  );

loaders['leetspeak'] = () =>
  import('@hieudoanm.github.io/components/pages/app/text-convert/LeetSpeakModal').then(
    (m) => ({ default: m.LeetSpeakModal })
  );

loaders['legislation'] = () =>
  import('@hieudoanm.github.io/components/pages/app/visualization/LegislationModal').then(
    (m) => ({ default: m.LegislationModal })
  );

loaders['lights-out'] = () =>
  import('@hieudoanm.github.io/components/pages/games/puzzle/LightsOut').then(
    (m) => ({ default: m.LightsOut })
  );

loaders['logmar'] = () =>
  import('@hieudoanm.github.io/components/pages/app/health-vision/LogMARChartModal').then(
    (m) => ({ default: m.LogMARChartModal })
  );

loaders['lorem-ipsum'] = () =>
  import('@hieudoanm.github.io/components/pages/app/utilities/LoremIpsumModal').then(
    (m) => ({ default: m.LoremIpsumModal })
  );

loaders['manifest'] = () =>
  import('@hieudoanm.github.io/components/pages/app/editors/ManifestModal').then(
    (m) => ({ default: m.ManifestModal })
  );

loaders['maze'] = () =>
  import('@hieudoanm.github.io/components/pages/games/puzzle/Maze').then(
    (m) => ({ default: m.Maze })
  );

loaders['memory-match'] = () =>
  import('@hieudoanm.github.io/components/pages/games/memory/MemoryMatch').then(
    (m) => ({ default: m.MemoryMatch })
  );

loaders['morse'] = () =>
  import('@hieudoanm.github.io/components/pages/app/text-convert/MorseModal').then(
    (m) => ({ default: m.MorseModal })
  );

loaders['n-back'] = () =>
  import('@hieudoanm.github.io/components/pages/games/memory/NBack').then(
    (m) => ({ default: m.NBack })
  );

loaders['no-sleep'] = () =>
  import('@hieudoanm.github.io/components/pages/app/utilities/NoSleepModal').then(
    (m) => ({ default: m.NoSleepModal })
  );

loaders['openapi'] = () =>
  import('@hieudoanm.github.io/components/pages/app/developer/OpenAPI2Postman').then(
    (m) => ({ default: m.OpenAPI2Postman })
  );

loaders['palindrome'] = () =>
  import('@hieudoanm.github.io/components/pages/games/word/Palindrome').then(
    (m) => ({ default: m.Palindrome })
  );

loaders['pd'] = () =>
  import('@hieudoanm.github.io/components/pages/games/trivia/PrisonerDilemma').then(
    (m) => ({ default: m.PrisonerDilemma })
  );

loaders['periodic-table'] = () =>
  import('@hieudoanm.github.io/components/pages/app/education/PeriodicTableModal').then(
    (m) => ({ default: m.PeriodicTableModal })
  );

loaders['pi'] = () =>
  import('@hieudoanm.github.io/components/pages/games/memory/PiNumber').then(
    (m) => ({ default: m.Pi })
  );

loaders['pitch'] = () =>
  import('@hieudoanm.github.io/components/pages/app/education/PitchModal').then(
    (m) => ({ default: m.PitchModal })
  );

loaders['pokedex'] = () =>
  import('@hieudoanm.github.io/components/pages/games/trivia/Pokedex').then(
    (m) => ({ default: m.Pokedex })
  );

loaders['poker'] = () =>
  import('@hieudoanm.github.io/components/pages/games/casino/Poker').then(
    (m) => ({ default: m.Poker })
  );

loaders['pomodoro'] = () =>
  import('@hieudoanm.github.io/components/pages/app/clocks/PomodoroModal').then(
    (m) => ({ default: m.PomodoroModal })
  );

loaders['proxy'] = () =>
  import('@hieudoanm.github.io/components/pages/app/developer/ProxyModal').then(
    (m) => ({ default: m.ProxyModal })
  );

loaders['quizify'] = () =>
  import('@hieudoanm.github.io/components/pages/games/memory/Quizify').then(
    (m) => ({ default: m.Quizify })
  );

loaders['recall'] = () =>
  import('@hieudoanm.github.io/components/pages/games/memory/Recall').then(
    (m) => ({ default: m.Recall })
  );

loaders['regex'] = () =>
  import('@hieudoanm.github.io/components/pages/app/editors/RegexModal').then(
    (m) => ({ default: m.RegexModal })
  );

loaders['resume'] = () =>
  import('@hieudoanm.github.io/components/pages/app/editors/ResumeModal').then(
    (m) => ({ default: m.ResumeModal })
  );

loaders['resume-timeline'] = () =>
  import('@hieudoanm.github.io/components/pages/app/visualization/ResumeTimelineModal').then(
    (m) => ({ default: m.ResumeTimelineModal })
  );

loaders['rps'] = () =>
  import('@hieudoanm.github.io/components/pages/games/arcade/RockPaperScissors').then(
    (m) => ({ default: m.RockPaperScissors })
  );

loaders['screen-recorder'] = () =>
  import('@hieudoanm.github.io/components/pages/app/utilities/ScreenRecorderModal').then(
    (m) => ({ default: m.ScreenRecorderModal })
  );

loaders['sheets'] = () =>
  import('@hieudoanm.github.io/components/pages/app/developer/SheetsModal').then(
    (m) => ({ default: m.SheetsModal })
  );

loaders['shopify-detect'] = () =>
  import('@hieudoanm.github.io/components/pages/app/developer/ShopifyDetectModal').then(
    (m) => ({ default: m.ShopifyDetectModal })
  );

loaders['sign'] = () =>
  import('@hieudoanm.github.io/components/pages/app/education/SignModal').then(
    (m) => ({ default: m.SignModal })
  );

loaders['slides'] = () =>
  import('@hieudoanm.github.io/components/pages/app/editors/SlidesModal').then(
    (m) => ({ default: m.SlidesModal })
  );

loaders['sliding-puzzle'] = () =>
  import('@hieudoanm.github.io/components/pages/games/puzzle/SlidingPuzzle').then(
    (m) => ({ default: m.SlidingPuzzle })
  );

loaders['slot-machine'] = () =>
  import('@hieudoanm.github.io/components/pages/games/casino/SlotMachine').then(
    (m) => ({ default: m.SlotMachine })
  );

loaders['snake'] = () =>
  import('@hieudoanm.github.io/components/pages/games/arcade/Snake').then(
    (m) => ({ default: m.Snake })
  );

loaders['snellen'] = () =>
  import('@hieudoanm.github.io/components/pages/app/health-vision/SnellenChartModal').then(
    (m) => ({ default: m.SnellenChartModal })
  );

loaders['split-bill'] = () =>
  import('@hieudoanm.github.io/components/pages/app/calculator/SplitBill').then(
    (m) => ({ default: m.SplitBill })
  );

loaders['split-csv'] = () =>
  import('@hieudoanm.github.io/components/pages/app/data-csv/SplitCsvModal').then(
    (m) => ({ default: m.SplitCsvModal })
  );

loaders['split-excel'] = () =>
  import('@hieudoanm.github.io/components/pages/app/data-excel/SplitExcelModal').then(
    (m) => ({ default: m.SplitExcelModal })
  );

loaders['sudoku'] = () =>
  import('@hieudoanm.github.io/components/pages/games/nikoli/Sudoku').then(
    (m) => ({ default: m.Sudoku })
  );

loaders['svg'] = () =>
  import('@hieudoanm.github.io/components/pages/app/developer/SVGModal').then(
    (m) => ({ default: m.SVGModal })
  );

loaders['t3'] = () =>
  import('@hieudoanm.github.io/components/pages/games/arcade/T3').then((m) => ({
    default: m.T3,
  }));

loaders['tai-baccarat'] = () =>
  import('@hieudoanm.github.io/components/pages/games/casino/Baccarat').then(
    (m) => ({ default: m.Baccarat })
  );

loaders['tax'] = () =>
  import('@hieudoanm.github.io/components/pages/app/calculator/Tax').then(
    (m) => ({ default: m.Tax })
  );

loaders['text-case'] = () =>
  import('@hieudoanm.github.io/components/pages/app/text-convert/TextCaseModal').then(
    (m) => ({ default: m.TextCaseModal })
  );

loaders['text-diff'] = () =>
  import('@hieudoanm.github.io/components/pages/app/developer/TextDiffModal').then(
    (m) => ({ default: m.TextDiffModal })
  );

loaders['text-password'] = () =>
  import('@hieudoanm.github.io/components/pages/app/utilities/TextPasswordModal').then(
    (m) => ({ default: m.TextPasswordModal })
  );

loaders['text-url-tracer'] = () =>
  import('@hieudoanm.github.io/components/pages/app/developer/TextUrlTracerModal').then(
    (m) => ({ default: m.TextUrlTracerModal })
  );

loaders['text-word-count'] = () =>
  import('@hieudoanm.github.io/components/pages/app/utilities/TextWordCountModal').then(
    (m) => ({ default: m.TextWordCountModal })
  );

loaders['towers'] = () =>
  import('@hieudoanm.github.io/components/pages/games/puzzle/Towers').then(
    (m) => ({ default: m.Towers })
  );

loaders['tumbling-e'] = () =>
  import('@hieudoanm.github.io/components/pages/app/health-vision/TumblingEChartModal').then(
    (m) => ({ default: m.TumblingEChartModal })
  );

loaders['typoglycemia'] = () =>
  import('@hieudoanm.github.io/components/pages/games/word/Typoglycemia').then(
    (m) => ({ default: m.Typoglycemia })
  );

loaders['uuid'] = () =>
  import('@hieudoanm.github.io/components/pages/app/developer/UUIDModal').then(
    (m) => ({ default: m.UUIDModal })
  );

loaders['watchface'] = () =>
  import('@hieudoanm.github.io/components/pages/app/clocks/WatchfaceModal').then(
    (m) => ({ default: m.WatchFaceModal })
  );

loaders['word-counter'] = () =>
  import('@hieudoanm.github.io/components/pages/app/editors/WordCounterModal').then(
    (m) => ({ default: m.WordCounterModal })
  );

loaders['wordle'] = () =>
  import('@hieudoanm.github.io/components/pages/games/word/Wordle').then(
    (m) => ({ default: m.Wordle })
  );

loaders['xml-to-csv'] = () =>
  import('@hieudoanm.github.io/components/pages/app/data-xml/XmlToCsvModal').then(
    (m) => ({ default: m.XmlToCsvModal })
  );

loaders['xml-to-excel'] = () =>
  import('@hieudoanm.github.io/components/pages/app/data-xml/XmlToExcelModal').then(
    (m) => ({ default: m.XmlToExcelModal })
  );

loaders['xml-to-json'] = () =>
  import('@hieudoanm.github.io/components/pages/app/data-xml/XmlToJsonModal').then(
    (m) => ({ default: m.XmlToJsonModal })
  );

export { loaders };
