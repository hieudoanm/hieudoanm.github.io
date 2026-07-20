import { ComponentType } from 'react';

type Loader = () => Promise<{
  default: ComponentType<{ onClose: () => void }>;
}>;

const loaders: Record<string, Loader> = {};

loaders['attractors'] = () =>
  import('@hieudoanm.github.io/components/pages/app/visualization/Attractors').then(
    (m) => ({ default: m.Attractors })
  );

loaders['blackjack'] = () =>
  import('@hieudoanm.github.io/components/pages/games/casino/Blackjack').then(
    (m) => ({ default: m.Blackjack })
  );

loaders['braille'] = () =>
  import('@hieudoanm.github.io/components/pages/app/text-convert/Braille').then(
    (m) => ({ default: m.Braille })
  );

loaders['calculator'] = () =>
  import('@hieudoanm.github.io/components/pages/app/calculator/Calculator').then(
    (m) => ({ default: m.Calculator })
  );

loaders['calendar-tracker'] = () =>
  import('@hieudoanm.github.io/components/pages/app/visualization/CalendarTracker').then(
    (m) => ({ default: m.CalendarTracker })
  );

loaders['chat'] = () =>
  import('@hieudoanm.github.io/components/pages/app/utilities/Chat').then(
    (m) => ({ default: m.Chat })
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
  import('@hieudoanm.github.io/components/pages/app/utilities/Clipboard').then(
    (m) => ({ default: m.Clipboard })
  );

loaders['countdown'] = () =>
  import('@hieudoanm.github.io/components/pages/app/clocks/Countdown').then(
    (m) => ({ default: m.Countdown })
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
  import('@hieudoanm.github.io/components/pages/app/utilities/CreateZip').then(
    (m) => ({ default: m.CreateZip })
  );

loaders['cron'] = () =>
  import('@hieudoanm.github.io/components/pages/app/clocks/Cron').then((m) => ({
    default: m.Cron,
  }));

loaders['csv-to-excel'] = () =>
  import('@hieudoanm.github.io/components/pages/app/data-csv/CsvToExcel').then(
    (m) => ({ default: m.CsvToExcel })
  );

loaders['csv-to-json'] = () =>
  import('@hieudoanm.github.io/components/pages/app/data-csv/CsvToJson').then(
    (m) => ({ default: m.CsvToJson })
  );

loaders['csv-to-xml'] = () =>
  import('@hieudoanm.github.io/components/pages/app/data-csv/CsvToXml').then(
    (m) => ({ default: m.CsvToXml })
  );

loaders['days-count'] = () =>
  import('@hieudoanm.github.io/components/pages/app/clocks/DaysCount').then(
    (m) => ({ default: m.DaysCount })
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
  import('@hieudoanm.github.io/components/pages/app/education/DOI').then(
    (m) => ({ default: m.DOI })
  );

loaders['emoji-guesser'] = () =>
  import('@hieudoanm.github.io/components/pages/games/countries/EmojiGuesser').then(
    (m) => ({ default: m.EmojiGuesser })
  );

loaders['emojis'] = () =>
  import('@hieudoanm.github.io/components/pages/app/utilities/Emojis').then(
    (m) => ({ default: m.Emojis })
  );

loaders['english'] = () =>
  import('@hieudoanm.github.io/components/pages/app/education/English').then(
    (m) => ({ default: m.LanguagesEnglish })
  );

loaders['epoch-convert'] = () =>
  import('@hieudoanm.github.io/components/pages/app/clocks/EpochConvert').then(
    (m) => ({ default: m.EpochConvert })
  );

loaders['excel-to-csv'] = () =>
  import('@hieudoanm.github.io/components/pages/app/data-excel/ExcelToCsv').then(
    (m) => ({ default: m.ExcelToCsv })
  );

loaders['excel-to-pdf'] = () =>
  import('@hieudoanm.github.io/components/pages/app/data-excel/ExcelToPdf').then(
    (m) => ({ default: m.ExcelToPdf })
  );

loaders['excel-to-xml'] = () =>
  import('@hieudoanm.github.io/components/pages/app/data-excel/ExcelToXml').then(
    (m) => ({ default: m.ExcelToXml })
  );

loaders['figlet'] = () =>
  import('@hieudoanm.github.io/components/pages/app/developer/Figlet').then(
    (m) => ({ default: m.Figlet })
  );

loaders['flag-guesser'] = () =>
  import('@hieudoanm.github.io/components/pages/games/countries/FlagGuesser').then(
    (m) => ({ default: m.FlagGuesser })
  );

loaders['flashcards'] = () =>
  import('@hieudoanm.github.io/components/pages/app/education/Flashcards').then(
    (m) => ({ default: m.Flashcards })
  );

loaders['game2048'] = () =>
  import('@hieudoanm.github.io/components/pages/games/puzzle/Game2048').then(
    (m) => ({ default: m.Game2048 })
  );

loaders['graph'] = () =>
  import('@hieudoanm.github.io/components/pages/app/visualization/Graph').then(
    (m) => ({ default: m.Graph })
  );

loaders['inflation'] = () =>
  import('@hieudoanm.github.io/components/pages/app/calculator/Inflation').then(
    (m) => ({ default: m.Inflation })
  );

loaders['ip'] = () =>
  import('@hieudoanm.github.io/components/pages/app/developer/IP').then(
    (m) => ({ default: m.IP })
  );

loaders['json-schema'] = () =>
  import('@hieudoanm.github.io/components/pages/app/editors/JSONSchema').then(
    (m) => ({ default: m.JSONSchema })
  );

loaders['json-to-csv'] = () =>
  import('@hieudoanm.github.io/components/pages/app/data-json/JsonToCsv').then(
    (m) => ({ default: m.JsonToCsv })
  );

loaders['json-to-xml'] = () =>
  import('@hieudoanm.github.io/components/pages/app/data-json/JsonToXml').then(
    (m) => ({ default: m.JsonToXml })
  );

loaders['kaprekar'] = () =>
  import('@hieudoanm.github.io/components/pages/app/utilities/Kaprekar').then(
    (m) => ({ default: m.Kaprekar })
  );

loaders['leetspeak'] = () =>
  import('@hieudoanm.github.io/components/pages/app/text-convert/LeetSpeak').then(
    (m) => ({ default: m.LeetSpeak })
  );

loaders['legislation'] = () =>
  import('@hieudoanm.github.io/components/pages/app/visualization/Legislation').then(
    (m) => ({ default: m.Legislation })
  );

loaders['lights-out'] = () =>
  import('@hieudoanm.github.io/components/pages/games/puzzle/LightsOut').then(
    (m) => ({ default: m.LightsOut })
  );

loaders['logmar'] = () =>
  import('@hieudoanm.github.io/components/pages/app/health-vision/LogMARChart').then(
    (m) => ({ default: m.LogMARChart })
  );

loaders['lorem-ipsum'] = () =>
  import('@hieudoanm.github.io/components/pages/app/utilities/LoremIpsum').then(
    (m) => ({ default: m.LoremIpsum })
  );

loaders['manifest'] = () =>
  import('@hieudoanm.github.io/components/pages/app/editors/Manifest').then(
    (m) => ({ default: m.Manifest })
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
  import('@hieudoanm.github.io/components/pages/app/text-convert/Morse').then(
    (m) => ({ default: m.Morse })
  );

loaders['n-back'] = () =>
  import('@hieudoanm.github.io/components/pages/games/memory/NBack').then(
    (m) => ({ default: m.NBack })
  );

loaders['no-sleep'] = () =>
  import('@hieudoanm.github.io/components/pages/app/utilities/NoSleep').then(
    (m) => ({ default: m.NoSleep })
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
  import('@hieudoanm.github.io/components/pages/app/education/PeriodicTable').then(
    (m) => ({ default: m.PeriodicTable })
  );

loaders['pi'] = () =>
  import('@hieudoanm.github.io/components/pages/games/memory/PiNumber').then(
    (m) => ({ default: m.Pi })
  );

loaders['pitch'] = () =>
  import('@hieudoanm.github.io/components/pages/app/education/Pitch').then(
    (m) => ({ default: m.Pitch })
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
  import('@hieudoanm.github.io/components/pages/app/clocks/Pomodoro').then(
    (m) => ({ default: m.Pomodoro })
  );

loaders['proxy'] = () =>
  import('@hieudoanm.github.io/components/pages/app/developer/Proxy').then(
    (m) => ({ default: m.Proxy })
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
  import('@hieudoanm.github.io/components/pages/app/editors/Regex').then(
    (m) => ({ default: m.Regex })
  );

loaders['resume'] = () =>
  import('@hieudoanm.github.io/components/pages/app/editors/Resume').then(
    (m) => ({ default: m.Resume })
  );

loaders['resume-timeline'] = () =>
  import('@hieudoanm.github.io/components/pages/app/visualization/ResumeTimeline').then(
    (m) => ({ default: m.ResumeTimeline })
  );

loaders['rps'] = () =>
  import('@hieudoanm.github.io/components/pages/games/arcade/RockPaperScissors').then(
    (m) => ({ default: m.RockPaperScissors })
  );

loaders['screen-recorder'] = () =>
  import('@hieudoanm.github.io/components/pages/app/utilities/ScreenRecorder').then(
    (m) => ({ default: m.ScreenRecorder })
  );

loaders['sheets'] = () =>
  import('@hieudoanm.github.io/components/pages/app/developer/Sheets').then(
    (m) => ({ default: m.Sheets })
  );

loaders['shopify-detect'] = () =>
  import('@hieudoanm.github.io/components/pages/app/developer/ShopifyDetect').then(
    (m) => ({ default: m.ShopifyDetect })
  );

loaders['sign'] = () =>
  import('@hieudoanm.github.io/components/pages/app/education/Sign').then(
    (m) => ({ default: m.Sign })
  );

loaders['slides'] = () =>
  import('@hieudoanm.github.io/components/pages/app/editors/Slides').then(
    (m) => ({ default: m.Slides })
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
  import('@hieudoanm.github.io/components/pages/app/health-vision/SnellenChart').then(
    (m) => ({ default: m.SnellenChart })
  );

loaders['split-bill'] = () =>
  import('@hieudoanm.github.io/components/pages/app/calculator/SplitBill').then(
    (m) => ({ default: m.SplitBill })
  );

loaders['split-csv'] = () =>
  import('@hieudoanm.github.io/components/pages/app/data-csv/SplitCsv').then(
    (m) => ({ default: m.SplitCsv })
  );

loaders['split-excel'] = () =>
  import('@hieudoanm.github.io/components/pages/app/data-excel/SplitExcel').then(
    (m) => ({ default: m.SplitExcel })
  );

loaders['sudoku'] = () =>
  import('@hieudoanm.github.io/components/pages/games/nikoli/Sudoku').then(
    (m) => ({ default: m.Sudoku })
  );

loaders['svg'] = () =>
  import('@hieudoanm.github.io/components/pages/app/developer/SVG').then(
    (m) => ({ default: m.SVG })
  );

loaders['t3'] = () =>
  import('@hieudoanm.github.io/components/pages/games/tic-tac-toe/T3').then(
    (m) => ({ default: m.TicTacToe })
  );

loaders['reverse'] = () =>
  import('@hieudoanm.github.io/components/pages/games/tic-tac-toe/Reverse').then(
    (m) => ({ default: m.Reverse })
  );

loaders['notakto'] = () =>
  import('@hieudoanm.github.io/components/pages/games/tic-tac-toe/Notakto').then(
    (m) => ({ default: m.Notakto })
  );

loaders['tai-baccarat'] = () =>
  import('@hieudoanm.github.io/components/pages/games/casino/Baccarat').then(
    (m) => ({ default: m.Baccarat })
  );

loaders['tax'] = () =>
  import('@hieudoanm.github.io/components/pages/app/calculator/Tax').then(
    (m) => ({ default: m.Tax })
  );

loaders['text-case'] = () =>
  import('@hieudoanm.github.io/components/pages/app/text-convert/TextCase').then(
    (m) => ({ default: m.TextCase })
  );

loaders['text-diff'] = () =>
  import('@hieudoanm.github.io/components/pages/app/developer/TextDiff').then(
    (m) => ({ default: m.TextDiff })
  );

loaders['text-password'] = () =>
  import('@hieudoanm.github.io/components/pages/app/utilities/TextPassword').then(
    (m) => ({ default: m.TextPassword })
  );

loaders['text-url-tracer'] = () =>
  import('@hieudoanm.github.io/components/pages/app/developer/TextUrlTracer').then(
    (m) => ({ default: m.TextUrlTracer })
  );

loaders['text-word-count'] = () =>
  import('@hieudoanm.github.io/components/pages/app/utilities/TextWordCount').then(
    (m) => ({ default: m.TextWordCount })
  );

loaders['towers'] = () =>
  import('@hieudoanm.github.io/components/pages/games/puzzle/Towers').then(
    (m) => ({ default: m.Towers })
  );

loaders['tumbling-e'] = () =>
  import('@hieudoanm.github.io/components/pages/app/health-vision/TumblingEChart').then(
    (m) => ({ default: m.TumblingEChart })
  );

loaders['typoglycemia'] = () =>
  import('@hieudoanm.github.io/components/pages/games/word/Typoglycemia').then(
    (m) => ({ default: m.Typoglycemia })
  );

loaders['uuid'] = () =>
  import('@hieudoanm.github.io/components/pages/app/developer/UUID').then(
    (m) => ({ default: m.UUID })
  );

loaders['watchface'] = () =>
  import('@hieudoanm.github.io/components/pages/app/clocks/Watchface').then(
    (m) => ({ default: m.WatchFace })
  );

loaders['word-counter'] = () =>
  import('@hieudoanm.github.io/components/pages/app/editors/WordCounter').then(
    (m) => ({ default: m.WordCounter })
  );

loaders['wordle'] = () =>
  import('@hieudoanm.github.io/components/pages/games/word/Wordle').then(
    (m) => ({ default: m.Wordle })
  );

loaders['xml-to-csv'] = () =>
  import('@hieudoanm.github.io/components/pages/app/data-xml/XmlToCsv').then(
    (m) => ({ default: m.XmlToCsv })
  );

loaders['xml-to-excel'] = () =>
  import('@hieudoanm.github.io/components/pages/app/data-xml/XmlToExcel').then(
    (m) => ({ default: m.XmlToExcel })
  );

loaders['xml-to-json'] = () =>
  import('@hieudoanm.github.io/components/pages/app/data-xml/XmlToJson').then(
    (m) => ({ default: m.XmlToJson })
  );

export { loaders };
