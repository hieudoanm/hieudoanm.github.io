-- Get Win Results by Opponent Rating
SELECT COUNT(*) as "count", floor((CASE WHEN g."whiteUsername" = 'hikaru' THEN g."blackRating" ELSE g."whiteRating" END) / 100) as "column" FROM chess."ChessGame" as g WHERE g."timeClass" = 'blitz' AND (g."whiteUsername"='hikaru' OR g."blackUsername"='hikaru') AND TEXT(CASE WHEN g."whiteUsername" = 'hikaru' THEN g."whiteResult" ELSE g."blackResult" END) in ('win') AND g."rated" = true AND g."rules" = 'chess' GROUP BY "column" ORDER BY "column"
-- Get Draw Results by Opponent Rating
SELECT COUNT(*) as "count", floor((CASE WHEN g."whiteUsername" = 'hikaru' THEN g."blackRating" ELSE g."whiteRating" END) / 100) as "column" FROM chess."ChessGame" as g WHERE g."timeClass" = 'blitz' AND (g."whiteUsername"='hikaru' OR g."blackUsername"='hikaru') AND TEXT(CASE WHEN g."whiteUsername" = 'hikaru' THEN g."whiteResult" ELSE g."blackResult" END) in ('fiftymove','agreed','insufficient','repetition','stalemate','timevsinsufficient') AND g."rated" = true AND g."rules" = 'chess' GROUP BY "column" ORDER BY "column"
-- Get Loss Results by Opponent Rating
SELECT COUNT(*) as "count", floor((CASE WHEN g."whiteUsername" = 'hikaru' THEN g."blackRating" ELSE g."whiteRating" END) / 100) as "column" FROM chess."ChessGame" as g WHERE g."timeClass" = 'blitz' AND (g."whiteUsername"='hikaru' OR g."blackUsername"='hikaru') AND TEXT(CASE WHEN g."whiteUsername" = 'hikaru' THEN g."whiteResult" ELSE g."blackResult" END) in ('checkmated','resigned','timeout','abandoned') AND g."rated" = true AND g."rules" = 'chess' GROUP BY "column" ORDER BY "column"
-- How well you perform in your 10 most played openings (hikaru as white)
SELECT c."opening",
o."pgn",
COUNT(*) as total,
SUM(CASE WHEN c."whiteResult" IN ('win') THEN 1 ELSE 0 END) as win,
SUM(CASE WHEN c."whiteResult" IN ('agreed','fiftymove') THEN 1 ELSE 0 END) as draw,
SUM(CASE WHEN c."whiteResult" IN ('timeout') THEN 1 ELSE 0 END) as black
FROM chess."ChessGame" as c
JOIN chess."ChessOpening" as o
ON c."opening" = o."name"
WHERE c."opening" <> ''
AND c."whiteUsername" = 'hikaru'
GROUP BY c."opening", o."pgn"
ORDER BY total DESC
LIMIT 10;
-- Moves per Piece (hikaru)
SELECT
SUM(CASE WHEN c."whiteUsername" = 'hikaru' THEN c."whitePawn" ELSE c."blackPawn" END) as pawn,
SUM(CASE WHEN c."whiteUsername" = 'hikaru' THEN c."whiteKnight" ELSE c."blackKnight" END) as knight,
SUM(CASE WHEN c."whiteUsername" = 'hikaru' THEN c."whiteBishop" ELSE c."blackBishop" END) as bishop,
SUM(CASE WHEN c."whiteUsername" = 'hikaru' THEN c."whiteRook" ELSE c."blackRook" END) as rook,
SUM(CASE WHEN c."whiteUsername" = 'hikaru' THEN c."whiteQueen" ELSE c."blackQueen" END) as queen,
SUM(CASE WHEN c."whiteUsername" = 'hikaru' THEN c."whiteKing" ELSE c."blackKing" END) as king
FROM chess."ChessGame" as c
WHERE c."whiteUsername" = 'hikaru' OR c."blackUsername" = 'hikaru';
-- When you castled short (kingside) vs castled long (queenside) vs never castled
SELECT
SUM(CASE WHEN
  (CASE WHEN c."whiteUsername" = 'hikaru' THEN c."whiteCastling" ELSE c."blackCastling" END) = 'short' AND
  (CASE WHEN c."whiteUsername" = 'hikaru' THEN c."blackCastling" ELSE c."whiteCastling" END) = 'short' AND
  (CASE WHEN c."whiteUsername" = 'hikaru' THEN c."whiteResult" ELSE c."blackResult" END) IN ('win') THEN 1 ELSE 0 END
) as short_short_win, SUM(CASE WHEN
  (CASE WHEN c."whiteUsername" = 'hikaru' THEN c."whiteCastling" ELSE c."blackCastling" END) = 'short' AND
  (CASE WHEN c."whiteUsername" = 'hikaru' THEN c."blackCastling" ELSE c."whiteCastling" END) = 'short' AND
  (CASE WHEN c."whiteUsername" = 'hikaru' THEN c."whiteResult" ELSE c."blackResult" END) IN ('fiftymove','agreed','insufficient','repetition','stalemate','timevsinsufficient') THEN 1 ELSE 0 END
) as short_short_draw, SUM(CASE WHEN
  (CASE WHEN c."whiteUsername" = 'hikaru' THEN c."whiteCastling" ELSE c."blackCastling" END) = 'short' AND
  (CASE WHEN c."whiteUsername" = 'hikaru' THEN c."blackCastling" ELSE c."whiteCastling" END) = 'short' AND
  (CASE WHEN c."whiteUsername" = 'hikaru' THEN c."whiteResult" ELSE c."blackResult" END) IN ('checkmated','resigned','timeout','abandoned') THEN 1 ELSE 0 END
) as short_short_loss, SUM(CASE WHEN
  (CASE WHEN c."whiteUsername" = 'hikaru' THEN c."whiteCastling" ELSE c."blackCastling" END) = 'short' AND
  (CASE WHEN c."whiteUsername" = 'hikaru' THEN c."blackCastling" ELSE c."whiteCastling" END) = 'long' AND
  (CASE WHEN c."whiteUsername" = 'hikaru' THEN c."whiteResult" ELSE c."blackResult" END) IN ('win') THEN 1 ELSE 0 END
) as short_long_win, SUM(CASE WHEN
  (CASE WHEN c."whiteUsername" = 'hikaru' THEN c."whiteCastling" ELSE c."blackCastling" END) = 'short' AND
  (CASE WHEN c."whiteUsername" = 'hikaru' THEN c."blackCastling" ELSE c."whiteCastling" END) = 'long' AND
  (CASE WHEN c."whiteUsername" = 'hikaru' THEN c."whiteResult" ELSE c."blackResult" END) IN ('fiftymove','agreed','insufficient','repetition','stalemate','timevsinsufficient') THEN 1 ELSE 0 END
) as short_long_draw, SUM(CASE WHEN
  (CASE WHEN c."whiteUsername" = 'hikaru' THEN c."whiteCastling" ELSE c."blackCastling" END) = 'short' AND
  (CASE WHEN c."whiteUsername" = 'hikaru' THEN c."blackCastling" ELSE c."whiteCastling" END) = 'long' AND
  (CASE WHEN c."whiteUsername" = 'hikaru' THEN c."whiteResult" ELSE c."blackResult" END) IN ('checkmated','resigned','timeout','abandoned') THEN 1 ELSE 0 END
) as short_long_loss, SUM(CASE WHEN
  (CASE WHEN c."whiteUsername" = 'hikaru' THEN c."whiteCastling" ELSE c."blackCastling" END) = 'short' AND
  (CASE WHEN c."whiteUsername" = 'hikaru' THEN c."blackCastling" ELSE c."whiteCastling" END) = '' AND
  (CASE WHEN c."whiteUsername" = 'hikaru' THEN c."whiteResult" ELSE c."blackResult" END) IN ('win') THEN 1 ELSE 0 END
) as short_none_win, SUM(CASE WHEN
  (CASE WHEN c."whiteUsername" = 'hikaru' THEN c."whiteCastling" ELSE c."blackCastling" END) = 'short' AND
  (CASE WHEN c."whiteUsername" = 'hikaru' THEN c."blackCastling" ELSE c."whiteCastling" END) = '' AND
  (CASE WHEN c."whiteUsername" = 'hikaru' THEN c."whiteResult" ELSE c."blackResult" END) IN ('fiftymove','agreed','insufficient','repetition','stalemate','timevsinsufficient') THEN 1 ELSE 0 END
) as short_none_draw, SUM(CASE WHEN
  (CASE WHEN c."whiteUsername" = 'hikaru' THEN c."whiteCastling" ELSE c."blackCastling" END) = 'short' AND
  (CASE WHEN c."whiteUsername" = 'hikaru' THEN c."blackCastling" ELSE c."whiteCastling" END) = '' AND
  (CASE WHEN c."whiteUsername" = 'hikaru' THEN c."whiteResult" ELSE c."blackResult" END) IN ('checkmated','resigned','timeout','abandoned') THEN 1 ELSE 0 END
) as short_none_loss,
SUM(CASE WHEN
  (CASE WHEN c."whiteUsername" = 'hikaru' THEN c."whiteCastling" ELSE c."blackCastling" END) = 'long' AND
  (CASE WHEN c."whiteUsername" = 'hikaru' THEN c."blackCastling" ELSE c."whiteCastling" END) = 'short' AND
  (CASE WHEN c."whiteUsername" = 'hikaru' THEN c."whiteResult" ELSE c."blackResult" END) IN ('win') THEN 1 ELSE 0 END
) as long_short_win, SUM(CASE WHEN
  (CASE WHEN c."whiteUsername" = 'hikaru' THEN c."whiteCastling" ELSE c."blackCastling" END) = 'long' AND
  (CASE WHEN c."whiteUsername" = 'hikaru' THEN c."blackCastling" ELSE c."whiteCastling" END) = 'short' AND
  (CASE WHEN c."whiteUsername" = 'hikaru' THEN c."whiteResult" ELSE c."blackResult" END) IN ('fiftymove','agreed','insufficient','repetition','stalemate','timevsinsufficient') THEN 1 ELSE 0 END
) as long_short_draw, SUM(CASE WHEN
  (CASE WHEN c."whiteUsername" = 'hikaru' THEN c."whiteCastling" ELSE c."blackCastling" END) = 'long' AND
  (CASE WHEN c."whiteUsername" = 'hikaru' THEN c."blackCastling" ELSE c."whiteCastling" END) = 'short' AND
  (CASE WHEN c."whiteUsername" = 'hikaru' THEN c."whiteResult" ELSE c."blackResult" END) IN ('checkmated','resigned','timeout','abandoned') THEN 1 ELSE 0 END
) as long_short_loss, SUM(CASE WHEN
  (CASE WHEN c."whiteUsername" = 'hikaru' THEN c."whiteCastling" ELSE c."blackCastling" END) = 'long' AND
  (CASE WHEN c."whiteUsername" = 'hikaru' THEN c."blackCastling" ELSE c."whiteCastling" END) = 'long' AND
  (CASE WHEN c."whiteUsername" = 'hikaru' THEN c."whiteResult" ELSE c."blackResult" END) IN ('win') THEN 1 ELSE 0 END
) as long_long_win, SUM(CASE WHEN
  (CASE WHEN c."whiteUsername" = 'hikaru' THEN c."whiteCastling" ELSE c."blackCastling" END) = 'long' AND
  (CASE WHEN c."whiteUsername" = 'hikaru' THEN c."blackCastling" ELSE c."whiteCastling" END) = 'long' AND
  (CASE WHEN c."whiteUsername" = 'hikaru' THEN c."whiteResult" ELSE c."blackResult" END) IN ('fiftymove','agreed','insufficient','repetition','stalemate','timevsinsufficient') THEN 1 ELSE 0 END
) as long_long_draw, SUM(CASE WHEN
  (CASE WHEN c."whiteUsername" = 'hikaru' THEN c."whiteCastling" ELSE c."blackCastling" END) = 'long' AND
  (CASE WHEN c."whiteUsername" = 'hikaru' THEN c."blackCastling" ELSE c."whiteCastling" END) = 'long' AND
  (CASE WHEN c."whiteUsername" = 'hikaru' THEN c."whiteResult" ELSE c."blackResult" END) IN ('checkmated','resigned','timeout','abandoned') THEN 1 ELSE 0 END
) as long_long_loss, SUM(CASE WHEN
  (CASE WHEN c."whiteUsername" = 'hikaru' THEN c."whiteCastling" ELSE c."blackCastling" END) = 'long' AND
  (CASE WHEN c."whiteUsername" = 'hikaru' THEN c."blackCastling" ELSE c."whiteCastling" END) = '' AND
  (CASE WHEN c."whiteUsername" = 'hikaru' THEN c."whiteResult" ELSE c."blackResult" END) IN ('win') THEN 1 ELSE 0 END
) as long_none_win, SUM(CASE WHEN
  (CASE WHEN c."whiteUsername" = 'hikaru' THEN c."whiteCastling" ELSE c."blackCastling" END) = 'long' AND
  (CASE WHEN c."whiteUsername" = 'hikaru' THEN c."blackCastling" ELSE c."whiteCastling" END) = '' AND
  (CASE WHEN c."whiteUsername" = 'hikaru' THEN c."whiteResult" ELSE c."blackResult" END) IN ('fiftymove','agreed','insufficient','repetition','stalemate','timevsinsufficient') THEN 1 ELSE 0 END
) as long_none_draw, SUM(CASE WHEN
  (CASE WHEN c."whiteUsername" = 'hikaru' THEN c."whiteCastling" ELSE c."blackCastling" END) = 'long' AND
  (CASE WHEN c."whiteUsername" = 'hikaru' THEN c."blackCastling" ELSE c."whiteCastling" END) = '' AND
  (CASE WHEN c."whiteUsername" = 'hikaru' THEN c."whiteResult" ELSE c."blackResult" END) IN ('checkmated','resigned','timeout','abandoned') THEN 1 ELSE 0 END
) as long_none_loss,
SUM(CASE WHEN
  (CASE WHEN c."whiteUsername" = 'hikaru' THEN c."whiteCastling" ELSE c."blackCastling" END) = '' AND
  (CASE WHEN c."whiteUsername" = 'hikaru' THEN c."blackCastling" ELSE c."whiteCastling" END) = 'short' AND
  (CASE WHEN c."whiteUsername" = 'hikaru' THEN c."whiteResult" ELSE c."blackResult" END) IN ('win') THEN 1 ELSE 0 END
) as none_short_win, SUM(CASE WHEN
  (CASE WHEN c."whiteUsername" = 'hikaru' THEN c."whiteCastling" ELSE c."blackCastling" END) = '' AND
  (CASE WHEN c."whiteUsername" = 'hikaru' THEN c."blackCastling" ELSE c."whiteCastling" END) = 'short' AND
  (CASE WHEN c."whiteUsername" = 'hikaru' THEN c."whiteResult" ELSE c."blackResult" END) IN ('fiftymove','agreed','insufficient','repetition','stalemate','timevsinsufficient') THEN 1 ELSE 0 END
) as none_short_draw, SUM(CASE WHEN
  (CASE WHEN c."whiteUsername" = 'hikaru' THEN c."whiteCastling" ELSE c."blackCastling" END) = '' AND
  (CASE WHEN c."whiteUsername" = 'hikaru' THEN c."blackCastling" ELSE c."whiteCastling" END) = 'short' AND
  (CASE WHEN c."whiteUsername" = 'hikaru' THEN c."whiteResult" ELSE c."blackResult" END) IN ('checkmated','resigned','timeout','abandoned') THEN 1 ELSE 0 END
) as none_short_loss, SUM(CASE WHEN
  (CASE WHEN c."whiteUsername" = 'hikaru' THEN c."whiteCastling" ELSE c."blackCastling" END) = '' AND
  (CASE WHEN c."whiteUsername" = 'hikaru' THEN c."blackCastling" ELSE c."whiteCastling" END) = 'long' AND
  (CASE WHEN c."whiteUsername" = 'hikaru' THEN c."whiteResult" ELSE c."blackResult" END) IN ('win') THEN 1 ELSE 0 END
) as none_long_win, SUM(CASE WHEN
  (CASE WHEN c."whiteUsername" = 'hikaru' THEN c."whiteCastling" ELSE c."blackCastling" END) = '' AND
  (CASE WHEN c."whiteUsername" = 'hikaru' THEN c."blackCastling" ELSE c."whiteCastling" END) = 'long' AND
  (CASE WHEN c."whiteUsername" = 'hikaru' THEN c."whiteResult" ELSE c."blackResult" END) IN ('fiftymove','agreed','insufficient','repetition','stalemate','timevsinsufficient') THEN 1 ELSE 0 END
) as none_long_draw, SUM(CASE WHEN
  (CASE WHEN c."whiteUsername" = 'hikaru' THEN c."whiteCastling" ELSE c."blackCastling" END) = '' AND
  (CASE WHEN c."whiteUsername" = 'hikaru' THEN c."blackCastling" ELSE c."whiteCastling" END) = 'long' AND
  (CASE WHEN c."whiteUsername" = 'hikaru' THEN c."whiteResult" ELSE c."blackResult" END) IN ('checkmated','resigned','timeout','abandoned') THEN 1 ELSE 0 END
) as none_long_loss, SUM(CASE WHEN
  (CASE WHEN c."whiteUsername" = 'hikaru' THEN c."whiteCastling" ELSE c."blackCastling" END) = '' AND
  (CASE WHEN c."whiteUsername" = 'hikaru' THEN c."blackCastling" ELSE c."whiteCastling" END) = '' AND
  (CASE WHEN c."whiteUsername" = 'hikaru' THEN c."whiteResult" ELSE c."blackResult" END) IN ('win') THEN 1 ELSE 0 END
) as none_none_win, SUM(CASE WHEN
  (CASE WHEN c."whiteUsername" = 'hikaru' THEN c."whiteCastling" ELSE c."blackCastling" END) = '' AND
  (CASE WHEN c."whiteUsername" = 'hikaru' THEN c."blackCastling" ELSE c."whiteCastling" END) = '' AND
  (CASE WHEN c."whiteUsername" = 'hikaru' THEN c."whiteResult" ELSE c."blackResult" END) IN ('fiftymove','agreed','insufficient','repetition','stalemate','timevsinsufficient') THEN 1 ELSE 0 END
) as none_none_draw, SUM(CASE WHEN
  (CASE WHEN c."whiteUsername" = 'hikaru' THEN c."whiteCastling" ELSE c."blackCastling" END) = '' AND
  (CASE WHEN c."whiteUsername" = 'hikaru' THEN c."blackCastling" ELSE c."whiteCastling" END) = '' AND
  (CASE WHEN c."whiteUsername" = 'hikaru' THEN c."whiteResult" ELSE c."blackResult" END) IN ('checkmated','resigned','timeout','abandoned') THEN 1 ELSE 0 END
) as none_none_loss
FROM chess."ChessGame" as c
WHERE c."whiteUsername" = 'hikaru' OR c."blackUsername" = 'hikaru'
-- How do you perform in the global chess community?
SELECT
c."flag",
p."countryCode" as code,
c."name",
COUNT(p."countryCode") as total,
SUM(CASE WHEN (CASE WHEN g."whiteUsername" = 'hikaru' THEN g."whiteResult" ELSE g."blackResult" END) IN ('win') THEN 1 ELSE 0 END) as win,
SUM(CASE WHEN (CASE WHEN g."whiteUsername" = 'hikaru' THEN g."whiteResult" ELSE g."blackResult" END) IN ('agreed') THEN 1 ELSE 0 END) as draw,
SUM(CASE WHEN (CASE WHEN g."whiteUsername" = 'hikaru' THEN g."whiteResult" ELSE g."blackResult" END) IN ('checkmated') THEN 1 ELSE 0 END) as loss
FROM chess."ChessGame" as g
JOIN chess."ChessPlayer" as p
ON (CASE g."whiteUsername" WHEN 'hikaru' THEN g."blackUsername" ELSE g."whiteUsername" END) = p."username"
JOIN chess."ChessCountry" as c
ON c."cca2" = p."countryCode"
WHERE g."whiteUsername" = 'hikaru' OR g."blackUsername" = 'hikaru'
GROUP BY c."flag", p."countryCode", c."name"
ORDER BY total DESC;
