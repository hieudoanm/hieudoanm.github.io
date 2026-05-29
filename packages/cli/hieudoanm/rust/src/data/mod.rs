pub static TITLES: &[&str] = &[
    "GM", "IM", "FM", "CM", "NM", "WGM", "WIM", "WFM", "WCM", "WNM",
];

pub static CHESS960_POSITIONS: &[&str] = &[
    "BBQNNRKR", "BQNBNRKR", "BQNNRBKR", "BQNNRKRB", "QBBNNRKR", "QNBBNRKR", "QNBNRBKR",
    "QNBNRKRB", "QBNNBRKR", "QNNBBRKR", "QNNRBBKR", "QNNRBKRB", "QBNNRKBR", "QNNBRKBR",
    "QNNRKBBR", "QNNRKRBB", "BBNQNRKR", "BNQBNRKR", "BNQNRBKR", "BNQNRKRB", "NBBQNRKR",
    "NQBBNRKR", "NQBNRBKR", "NQBNRKRB", "NBQNBRKR", "NQNBBRKR", "NQNRBBKR", "NQNRBKRB",
    "NBQNRKBR", "NQNBRKBR", "NQNRKBBR", "NQNRKRBB", "BBNNQRKR", "BNNBQRKR", "BNNQRBKR",
    "BNNQRKRB", "NBBNQRKR", "NNBBQRKR", "NNBQRBKR", "NNBQRKRB", "NBNQBRKR", "NNQBBRKR",
    "NNQRBBKR", "NNQRBKRB", "NBNQRKBR", "NNQBRKBR", "NNQRKBBR", "NNQRKRBB", "BBNNRQKR",
    "BNNBRQKR", "BNNRQBKR", "BNNRQKRB", "NBBNRQKR", "NNBBRQKR", "NNBRQBKR", "NNBRQKRB",
    "NBNRBQKR", "NNRBBQKR", "NNRQBBKR", "NNRQBKRB", "NBNRQKBR", "NNRBQKBR", "NNRQKBBR",
    "NNRQKRBB", "BBNNRKQR", "BNNBRKQR", "BNNRKBQR", "BNNRKQRB", "NBBNRKQR", "NNBBRKQR",
    "NNBRKBQR", "NNBRKQRB", "NBNRBKQR", "NNRBBKQR", "NNRKBBQR", "NNRKBQRB", "NBNRKQBR",
    "NNRBKQBR", "NNRKQBBR", "NNRKQRBB", "BBNNRKRQ", "BNNBRKRQ", "BNNRKBRQ", "BNNRKRQB",
    "NBBNRKRQ", "NNBBRKRQ", "NNBRKBRQ", "NNBRKRQB", "NBNRBKRQ", "NNRBBKRQ", "NNRKBBRQ",
    "NNRKBRQB", "NBNRKRBQ", "NNRBKRBQ", "NNRKRBBQ", "NNRKRQBB", "BBQNRNKR", "BQNBRNKR",
    "BQNRNBKR", "BQNRNKRB", "QBBNRNKR", "QNBBRNKR", "QNBRNBKR", "QNBRNKRB", "QBNRBNKR",
    "QNRBBNKR", "QNRNBBKR", "QNRNBKRB", "QBNRNKBR", "QNRBNKBR", "QNRNKBBR", "QNRNKRBB",
    "BBNQRNKR", "BNQBRNKR", "BNQRNBKR", "BNQRNKRB", "NBBQRNKR", "NQBBRNKR", "NQBRNBKR",
    "NQBRNKRB", "NBQRBNKR", "NQRBBNKR", "NQRNBBKR", "NQRNBKRB", "NBQRNKBR", "NQRBNKBR",
    "NQRNKBBR", "NQRNKRBB", "BBNRQNKR", "BNRBQNKR", "BNRQNBKR", "BNRQNKRB", "NBBRQNKR",
    "NRBBQNKR", "NRBQNBKR", "NRBQNKRB", "NBRQBNKR", "NRQBBNKR", "NRQNBBKR", "NRQNBKRB",
    "NBRQNKBR", "NRQBNKBR", "NRQNKBBR", "NRQNKRBB", "BBNRNQKR", "BNRBNQKR", "BNRNQBKR",
    "BNRNQKRB", "NBBRNQKR", "NRBBNQKR", "NRBNQBKR", "NRBNQKRB", "NBRNBQKR", "NRNBBQKR",
    "NRNQBBKR", "NRNQBKRB", "NBRNQKBR", "NRNBQKBR", "NRNQKBBR", "NRNQKRBB", "BBNRNKQR",
    "BNRBNKQR", "BNRNKBQR", "BNRNKQRB", "NBBRNKQR", "NRBBNKQR", "NRBNKBQR", "NRBNKQRB",
    "NBRNBKQR", "NRNBBKQR", "NRNKBBQR", "NRNKBQRB", "NBRNKQBR", "NRNBKQBR", "NRNKQBBR",
    "NRNKQRBB", "BBNRNKRQ", "BNRBNKRQ", "BNRNKBRQ", "BNRNKRQB", "NBBRNKRQ", "NRBBNKRQ",
    "NRBNKBRQ", "NRBNKRQB", "NBRNBKRQ", "NRNBBKRQ", "NRNKBBRQ", "NRNKBRQB", "NBRNKRBQ",
    "NRNBKRBQ", "NRNKRBBQ", "NRNKRQBB", "BBQNRKNR", "BQNBRKNR", "BQNRKBNR", "BQNRKNRB",
    "QBBNRKNR", "QNBBRKNR", "QNBRKBNR", "QNBRKNRB", "QBNRBKNR", "QNRBBKNR", "QNRKBBNR",
    "QNRKBNRB", "QBNRKNBR", "QNRBKNBR", "QNRKNBBR", "QNRKNRBB", "BBNQRKNR", "BNQBRKNR",
    "BNQRKBNR", "BNQRKNRB", "NBBQRKNR", "NQBBRKNR", "NQBRKBNR", "NQBRKNRB", "NBQRBKNR",
    "NQRBBKNR", "NQRKBBNR", "NQRKBNRB", "NBQRKNBR", "NQRBKNBR", "NQRKNBBR", "NQRKNRBB",
    "BBNRQKNR", "BNRBQKNR", "BNRQKBNR", "BNRQKNRB", "NBBRQKNR", "NRBBQKNR", "NRBQKBNR",
    "NRBQKNRB", "NBRQBKNR", "NRQBBKNR", "NRQKBBNR", "NRQKBNRB", "NBRQKNBR", "NRQBKNBR",
    "NRQKNBBR", "NRQKNRBB", "BBNRKQNR", "BNRBKQNR", "BNRKQBNR", "BNRKQNRB", "NBBRKQNR",
    "NRBBKQNR", "NRBKQBNR", "NRBKQNRB", "NBRKBQNR", "NRKBBQNR", "NRKQBBNR", "NRKQBNRB",
    "NBRKQNBR", "NRKBQNBR", "NRKQNBBR", "NRKQNRBB", "BBNRKNQR", "BNRBKNQR", "BNRKNBQR",
    "BNRKNQRB", "NBBRKNQR", "NRBBKNQR", "NRBKNBQR", "NRBKNQRB", "NBRKBNQR", "NRKBBNQR",
    "NRKNBBQR", "NRKNBQRB", "NBRKNQBR", "NRKBNQBR", "NRKNQBBR", "NRKNQRBB", "BBNRKNRQ",
    "BNRBKNRQ", "BNRKNBRQ", "BNRKNRQB", "NBBRKNRQ", "NRBBKNRQ", "NRBKNBRQ", "NRBKNRQB",
    "NBRKBNRQ", "NRKBBNRQ", "NRKNBBRQ", "NRKNBRQB", "NBRKNRBQ", "NRKBNRBQ", "NRKNRBBQ",
    "NRKNRQBB", "BBQNRKRN", "BQNBRKRN", "BQNRKBRN", "BQNRKRNB", "QBBNRKRN", "QNBBRKRN",
    "QNBRKBRN", "QNBRKRNB", "QBNRBKRN", "QNRBBKRN", "QNRKBBRN", "QNRKBRNB", "QBNRKRBN",
    "QNRBKRBN", "QNRKRBBN", "QNRKRNBB", "BBNQRKRN", "BNQBRKRN", "BNQRKBRN", "BNQRKRNB",
    "NBBQRKRN", "NQBBRKRN", "NQBRKBRN", "NQBRKRNB", "NBQRBKRN", "NQRBBKRN", "NQRKBBRN",
    "NQRKBRNB", "NBQRKRBN", "NQRBKRBN", "NQRKRBBN", "NQRKRNBB", "BBNRQKRN", "BNRBQKRN",
    "BNRQKBRN", "BNRQKRNB", "NBBRQKRN", "NRBBQKRN", "NRBQKBRN", "NRBQKRNB", "NBRQBKRN",
    "NRQBBKRN", "NRQKBBRN", "NRQKBRNB", "NBRQKRBN", "NRQBKRBN", "NRQKRBBN", "NRQKRNBB",
    "BBNRKQRN", "BNRBKQRN", "BNRKQBRN", "BNRKQRNB", "NBBRKQRN", "NRBBKQRN", "NRBKQBRN",
    "NRBKQRNB", "NBRKBQRN", "NRKBBQRN", "NRKQBBRN", "NRKQBRNB", "NBRKQRBN", "NRKBQRBN",
    "NRKQRBBN", "NRKQRNBB", "BBNRKRQN", "BNRBKRQN", "BNRKRBQN", "BNRKRQNB", "NBBRKRQN",
    "NRBBKRQN", "NRBKRBQN", "NRBKRQNB", "NBRKBRQN", "NRKBBRQN", "NRKRBBQN", "NRKRBQNB",
    "NBRKRQBN", "NRKBRQBN", "NRKRQBBN", "NRKRQNBB", "BBNRKRNQ", "BNRBKRNQ", "BNRKRBNQ",
    "BNRKRNQB", "NBBRKRNQ", "NRBBKRNQ", "NRBKRBNQ", "NRBKRNQB", "NBRKBRNQ", "NRKBBRNQ",
    "NRKRBBNQ", "NRKRBNQB", "NBRKRNBQ", "NRKBRNBQ", "NRKRNBBQ", "NRKRNQBB", "BBQRNNKR",
    "BQRBNNKR", "BQRNNBKR", "BQRNNKRB", "QBBRNNKR", "QRBBNNKR", "QRBNNBKR", "QRBNNKRB",
    "QBRNBNKR", "QRNBBNKR", "QRNNBBKR", "QRNNBKRB", "QBRNNKBR", "QRNBNKBR", "QRNNKBBR",
    "QRNNKRBB", "BBRQNNKR", "BRQBNNKR", "BRQNNBKR", "BRQNNKRB", "RBBQNNKR", "RQBBNNKR",
    "RQBNNBKR", "RQBNNKRB", "RBQNBNKR", "RQNBBNKR", "RQNNBBKR", "RQNNBKRB", "RBQNNKBR",
    "RQNBNKBR", "RQNNKBBR", "RQNNKRBB", "BBRNQNKR", "BRNBQNKR", "BRNQNBKR", "BRNQNKRB",
    "RBBNQNKR", "RNBBQNKR", "RNBQNBKR", "RNBQNKRB", "RBNQBNKR", "RNQBBNKR", "RNQNBBKR",
    "RNQNBKRB", "RBNQNKBR", "RNQBNKBR", "RNQNKBBR", "RNQNKRBB", "BBRNNQKR", "BRNBNQKR",
    "BRNNQBKR", "BRNNQKRB", "RBBNNQKR", "RNBBNQKR", "RNBNQBKR", "RNBNQKRB", "RBNNBQKR",
    "RNNBBQKR", "RNNQBBKR", "RNNQBKRB", "RBNNQKBR", "RNNBQKBR", "RNNQKBBR", "RNNQKRBB",
    "BBRNNKQR", "BRNBNKQR", "BRNNKBQR", "BRNNKQRB", "RBBNNKQR", "RNBBNKQR", "RNBNKBQR",
    "RNBNKQRB", "RBNNBKQR", "RNNBBKQR", "RNNKBBQR", "RNNKBQRB", "RBNNKQBR", "RNNBKQBR",
    "RNNKQBBR", "RNNKQRBB", "BBRNNKRQ", "BRNBNKRQ", "BRNNKBRQ", "BRNNKRQB", "RBBNNKRQ",
    "RNBBNKRQ", "RNBNKBRQ", "RNBNKRQB", "RBNNBKRQ", "RNNBBKRQ", "RNNKBBRQ", "RNNKBRQB",
    "RBNNKRBQ", "RNNBKRBQ", "RNNKRBBQ", "RNNKRQBB", "BBQRNKNR", "BQRBNKNR", "BQRNKBNR",
    "BQRNKNRB", "QBBRNKNR", "QRBBNKNR", "QRBNKBNR", "QRBNKNRB", "QBRNBKNR", "QRNBBKNR",
    "QRNKBBNR", "QRNKBNRB", "QBRNKNBR", "QRNBKNBR", "QRNKNBBR", "QRNKNRBB", "BBRQNKNR",
    "BRQBNKNR", "BRQNKBNR", "BRQNKNRB", "RBBQNKNR", "RQBBNKNR", "RQBNKBNR", "RQBNKNRB",
    "RBQNBKNR", "RQNBBKNR", "RQNKBBNR", "RQNKBNRB", "RBQNKNBR", "RQNBKNBR", "RQNKNBBR",
    "RQNKNRBB", "BBRNQKNR", "BRNBQKNR", "BRNQKBNR", "BRNQKNRB", "RBBNQKNR", "RNBBQKNR",
    "RNBQKBNR", "RNBQKNRB", "RBNQBKNR", "RNQBBKNR", "RNQKBBNR", "RNQKBNRB", "RBNQKNBR",
    "RNQBKNBR", "RNQKNBBR", "RNQKNRBB", "BBRNKQNR", "BRNBKQNR", "BRNKQBNR", "BRNKQNRB",
    "RBBNKQNR", "RNBBKQNR", "RNBKQBNR", "RNBKQNRB", "RBNKBQNR", "RNKBBQNR", "RNKQBBNR",
    "RNKQBNRB", "RBNKQNBR", "RNKBQNBR", "RNKQNBBR", "RNKQNRBB", "BBRNKNQR", "BRNBKNQR",
    "BRNKNBQR", "BRNKNQRB", "RBBNKNQR", "RNBBKNQR", "RNBKNBQR", "RNBKNQRB", "RBNKBNQR",
    "RNKBBNQR", "RNKNBBQR", "RNKNBQRB", "RBNKNQBR", "RNKBNQBR", "RNKNQBBR", "RNKNQRBB",
    "BBRNKNRQ", "BRNBKNRQ", "BRNKNBRQ", "BRNKNRQB", "RBBNKNRQ", "RNBBKNRQ", "RNBKNBRQ",
    "RNBKNRQB", "RBNKBNRQ", "RNKBBNRQ", "RNKNBBRQ", "RNKNBRQB", "RBNKNRBQ", "RNKBNRBQ",
    "RNKNRBBQ", "RNKNRQBB", "BBQRNKRN", "BQRBNKRN", "BQRNKBRN", "BQRNKRNB", "QBBRNKRN",
    "QRBBNKRN", "QRBNKBRN", "QRBNKRNB", "QBRNBKRN", "QRNBBKRN", "QRNKBBRN", "QRNKBRNB",
    "QBRNKRBN", "QRNBKRBN", "QRNKRBBN", "QRNKRNBB", "BBRQNKRN", "BRQBNKRN", "BRQNKBRN",
    "BRQNKRNB", "RBBQNKRN", "RQBBNKRN", "RQBNKBRN", "RQBNKRNB", "RBQNBKRN", "RQNBBKRN",
    "RQNKBBRN", "RQNKBRNB", "RBQNKRBN", "RQNBKRBN", "RQNKRBBN", "RQNKRNBB", "BBRNQKRN",
    "BRNBQKRN", "BRNQKBRN", "BRNQKRNB", "RBBNQKRN", "RNBBQKRN", "RNBQKBRN", "RNBQKRNB",
    "RBNQBKRN", "RNQBBKRN", "RNQKBBRN", "RNQKBRNB", "RBNQKRBN", "RNQBKRBN", "RNQKRBBN",
    "RNQKRNBB", "BBRNKQRN", "BRNBKQRN", "BRNKQBRN", "BRNKQRNB", "RBBNKQRN", "RNBBKQRN",
    "RNBKQBRN", "RNBKQRNB", "RBNKBQRN", "RNKBBQRN", "RNKQBBRN", "RNKQBRNB", "RBNKQRBN",
    "RNKBQRBN", "RNKQRBBN", "RNKQRNBB", "BBRNKRQN", "BRNBKRQN", "BRNKRBQN", "BRNKRQNB",
    "RBBNKRQN", "RNBBKRQN", "RNBKRBQN", "RNBKRQNB", "RBNKBRQN", "RNKBBRQN", "RNKRBBQN",
    "RNKRBQNB", "RBNKRQBN", "RNKBRQBN", "RNKRQBBN", "RNKRQNBB", "BBRNKRNQ", "BRNBKRNQ",
    "BRNKRBNQ", "BRNKRNQB", "RBBNKRNQ", "RNBBKRNQ", "RNBKRBNQ", "RNBKRNQB", "RBNKBRNQ",
    "RNKBBRNQ", "RNKRBBNQ", "RNKRBNQB", "RBNKRNBQ", "RNKBRNBQ", "RNKRNBBQ", "RNKRNQBB",
    "BBQRKNNR", "BQRBKNNR", "BQRKNBNR", "BQRKNNRB", "QBBRKNNR", "QRBBKNNR", "QRBKNBNR",
    "QRBKNNRB", "QBRKBNNR", "QRKBBNNR", "QRKNBBNR", "QRKNBNRB", "QBRKNNBR", "QRKBNNBR",
    "QRKNNBBR", "QRKNNRBB", "BBRQKNNR", "BRQBKNNR", "BRQKNBNR", "BRQKNNRB", "RBBQKNNR",
    "RQBBKNNR", "RQBKNBNR", "RQBKNNRB", "RBQKBNNR", "RQKBBNNR", "RQKNBBNR", "RQKNBNRB",
    "RBQKNNBR", "RQKBNNBR", "RQKNNBBR", "RQKNNRBB", "BBRKQNNR", "BRKBQNNR", "BRKQNBNR",
    "BRKQNNRB", "RBBKQNNR", "RKBBQNNR", "RKBQNBNR", "RKBQNNRB", "RBKQBNNR", "RKQBBNNR",
    "RKQNBBNR", "RKQNBNRB", "RBKQNNBR", "RKQBNNBR", "RKQNNBBR", "RKQNNRBB", "BBRKNQNR",
    "BRKBNQNR", "BRKNQBNR", "BRKNQNRB", "RBBKNQNR", "RKBBNQNR", "RKBNQBNR", "RKBNQNRB",
    "RBKNBQNR", "RKNBBQNR", "RKNQBBNR", "RKNQBNRB", "RBKNQNBR", "RKNBQNBR", "RKNQNBBR",
    "RKNQNRBB", "BBRKNNQR", "BRKBNNQR", "BRKNNBQR", "BRKNNQRB", "RBBKNNQR", "RKBBNNQR",
    "RKBNNBQR", "RKBNNQRB", "RBKNBNQR", "RKNBBNQR", "RKNNBBQR", "RKNNBQRB", "RBKNNQBR",
    "RKNBNQBR", "RKNNQBBR", "RKNNQRBB", "BBRKNNRQ", "BRKBNNRQ", "BRKNNBRQ", "BRKNNRQB",
    "RBBKNNRQ", "RKBBNNRQ", "RKBNNBRQ", "RKBNNRQB", "RBKNBNRQ", "RKNBBNRQ", "RKNNBBRQ",
    "RKNNBRQB", "RBKNNRBQ", "RKNBNRBQ", "RKNNRBBQ", "RKNNRQBB", "BBQRKNRN", "BQRBKNRN",
    "BQRKNBRN", "BQRKNRNB", "QBBRKNRN", "QRBBKNRN", "QRBKNBRN", "QRBKNRNB", "QBRKBNRN",
    "QRKBBNRN", "QRKNBBRN", "QRKNBRNB", "QBRKNRBN", "QRKBNRBN", "QRKNRBBN", "QRKNRNBB",
    "BBRQKNRN", "BRQBKNRN", "BRQKNBRN", "BRQKNRNB", "RBBQKNRN", "RQBBKNRN", "RQBKNBRN",
    "RQBKNRNB", "RBQKBNRN", "RQKBBNRN", "RQKNBBRN", "RQKNBRNB", "RBQKNRBN", "RQKBNRBN",
    "RQKNRBBN", "RQKNRNBB", "BBRKQNRN", "BRKBQNRN", "BRKQNBRN", "BRKQNRNB", "RBBKQNRN",
    "RKBBQNRN", "RKBQNBRN", "RKBQNRNB", "RBKQBNRN", "RKQBBNRN", "RKQNBBRN", "RKQNBRNB",
    "RBKQNRBN", "RKQBNRBN", "RKQNRBBN", "RKQNRNBB", "BBRKNQRN", "BRKBNQRN", "BRKNQBRN",
    "BRKNQRNB", "RBBKNQRN", "RKBBNQRN", "RKBNQBRN", "RKBNQRNB", "RBKNBQRN", "RKNBBQRN",
    "RKNQBBRN", "RKNQBRNB", "RBKNQRBN", "RKNBQRBN", "RKNQRBBN", "RKNQRNBB", "BBRKNRQN",
    "BRKBNRQN", "BRKNRBQN", "BRKNRQNB", "RBBKNRQN", "RKBBNRQN", "RKBNRBQN", "RKBNRQNB",
    "RBKNBRQN", "RKNBBRQN", "RKNRBBQN", "RKNRBQNB", "RBKNRQBN", "RKNBRQBN", "RKNRQBBN",
    "RKNRQNBB", "BBRKNRNQ", "BRKBNRNQ", "BRKNRBNQ", "BRKNRNQB", "RBBKNRNQ", "RKBBNRNQ",
    "RKBNRBNQ", "RKBNRNQB", "RBKNBRNQ", "RKNBBRNQ", "RKNRBBNQ", "RKNRBNQB", "RBKNRNBQ",
    "RKNBRNBQ", "RKNRNBBQ", "RKNRNQBB", "BBQRKRNN", "BQRBKRNN", "BQRKRBNN", "BQRKRNNB",
    "QBBRKRNN", "QRBBKRNN", "QRBKRBNN", "QRBKRNNB", "QBRKBRNN", "QRKBBRNN", "QRKRBBNN",
    "QRKRBNNB", "QBRKRNBN", "QRKBRNBN", "QRKRNBBN", "QRKRNNBB", "BBRQKRNN", "BRQBKRNN",
    "BRQKRBNN", "BRQKRNNB", "RBBQKRNN", "RQBBKRNN", "RQBKRBNN", "RQBKRNNB", "RBQKBRNN",
    "RQKBBRNN", "RQKRBBNN", "RQKRBNNB", "RBQKRNBN", "RQKBRNBN", "RQKRNBBN", "RQKRNNBB",
    "BBRKQRNN", "BRKBQRNN", "BRKQRBNN", "BRKQRNNB", "RBBKQRNN", "RKBBQRNN", "RKBQRBNN",
    "RKBQRNNB", "RBKQBRNN", "RKQBBRNN", "RKQRBBNN", "RKQRBNNB", "RBKQRNBN", "RKQBRNBN",
    "RKQRNBBN", "RKQRNNBB", "BBRKRQNN", "BRKBRQNN", "BRKRQBNN", "BRKRQNNB", "RBBKRQNN",
    "RKBBRQNN", "RKBRQBNN", "RKBRQNNB", "RBKRBQNN", "RKRBBQNN", "RKRQBBNN", "RKRQBNNB",
    "RBKRQNBN", "RKRBQNBN", "RKRQNBBN", "RKRQNNBB", "BBRKRNQN", "BRKBRNQN", "BRKRNBQN",
    "BRKRNQNB", "RBBKRNQN", "RKBBRNQN", "RKBRNBQN", "RKBRNQNB", "RBKRBNQN", "RKRBBNQN",
    "RKRNBBQN", "RKRNBQNB", "RBKRNQBN", "RKRBNQBN", "RKRNQBBN", "RKRNQNBB", "BBRKRNNQ",
    "BRKBRNNQ", "BRKRNBNQ", "BRKRNNQB", "RBBKRNNQ", "RKBBRNNQ", "RKBRNBNQ", "RKBRNNQB",
    "RBKRBNNQ", "RKRBBNNQ", "RKRNBBNQ", "RKRNBNQB", "RBKRNNBQ", "RKRBNNBQ", "RKRNNBBQ",
    "RKRNNQBB",
];

use std::collections::HashMap;

pub static COUNTRIES: once_cell::sync::Lazy<HashMap<&'static str, &'static str>> = once_cell::sync::Lazy::new(|| {
    let mut m = HashMap::new();
    m.insert("AD", "Andorra");
    m.insert("AE", "United Arab Emirates");
    m.insert("AF", "Afghanistan");
    m.insert("AG", "Antigua And Barbuda");
    m.insert("AI", "Anguilla");
    m.insert("AL", "Albania");
    m.insert("AM", "Armenia");
    m.insert("AO", "Angola");
    m.insert("AQ", "Antarctica");
    m.insert("AR", "Argentina");
    m.insert("AS", "American Samoa");
    m.insert("AT", "Austria");
    m.insert("AU", "Australia");
    m.insert("AW", "Aruba");
    m.insert("AX", "Åland Islands");
    m.insert("AZ", "Azerbaijan");
    m.insert("BA", "Bosnia And Herzegovina");
    m.insert("BB", "Barbados");
    m.insert("BD", "Bangladesh");
    m.insert("BE", "Belgium");
    m.insert("BF", "Burkina Faso");
    m.insert("BG", "Bulgaria");
    m.insert("BH", "Bahrain");
    m.insert("BI", "Burundi");
    m.insert("BJ", "Benin");
    m.insert("BL", "Saint Barthélemy");
    m.insert("BM", "Bermuda");
    m.insert("BN", "Brunei Darussalam");
    m.insert("BO", "Bolivia");
    m.insert("BQ", "Bonaire, Sint Eustatius And Saba");
    m.insert("BR", "Brazil");
    m.insert("BS", "Bahamas");
    m.insert("BT", "Bhutan");
    m.insert("BV", "Bouvet Island");
    m.insert("BW", "Botswana");
    m.insert("BY", "Belarus");
    m.insert("BZ", "Belize");
    m.insert("CA", "Canada");
    m.insert("CC", "Cocos (Keeling) Islands");
    m.insert("CD", "Democratic Republic Of The Congo");
    m.insert("CF", "Central African Republic");
    m.insert("CG", "Congo");
    m.insert("CH", "Switzerland");
    m.insert("CI", "Côte D'Ivoire");
    m.insert("CK", "Cook Islands");
    m.insert("CL", "Chile");
    m.insert("CM", "Cameroon");
    m.insert("CN", "China");
    m.insert("CO", "Colombia");
    m.insert("CR", "Costa Rica");
    m.insert("CU", "Cuba");
    m.insert("CV", "Cabo Verde");
    m.insert("CW", "Curaçao");
    m.insert("CX", "Christmas Island");
    m.insert("CY", "Cyprus");
    m.insert("CZ", "Czechia");
    m.insert("DE", "Germany");
    m.insert("DJ", "Djibouti");
    m.insert("DK", "Denmark");
    m.insert("DM", "Dominica");
    m.insert("DO", "Dominican Republic");
    m.insert("DZ", "Algeria");
    m.insert("EC", "Ecuador");
    m.insert("EE", "Estonia");
    m.insert("EG", "Egypt");
    m.insert("EH", "Western Sahara");
    m.insert("ER", "Eritrea");
    m.insert("ES", "Spain");
    m.insert("ET", "Ethiopia");
    m.insert("FI", "Finland");
    m.insert("FJ", "Fiji");
    m.insert("FK", "Falkland Islands");
    m.insert("FM", "Micronesia");
    m.insert("FO", "Faroe Islands");
    m.insert("FR", "France");
    m.insert("GA", "Gabon");
    m.insert("GB", "United Kingdom");
    m.insert("GD", "Grenada");
    m.insert("GE", "Georgia");
    m.insert("GF", "French Guiana");
    m.insert("GG", "Guernsey");
    m.insert("GH", "Ghana");
    m.insert("GI", "Gibraltar");
    m.insert("GL", "Greenland");
    m.insert("GM", "Gambia");
    m.insert("GN", "Guinea");
    m.insert("GP", "Guadeloupe");
    m.insert("GQ", "Equatorial Guinea");
    m.insert("GR", "Greece");
    m.insert("GS", "South Georgia And The South Sandwich Islands");
    m.insert("GT", "Guatemala");
    m.insert("GU", "Guam");
    m.insert("GW", "Guinea-Bissau");
    m.insert("GY", "Guyana");
    m.insert("HK", "Hong Kong");
    m.insert("HM", "Heard Island And McDonald Islands");
    m.insert("HN", "Honduras");
    m.insert("HR", "Croatia");
    m.insert("HT", "Haiti");
    m.insert("HU", "Hungary");
    m.insert("ID", "Indonesia");
    m.insert("IE", "Ireland");
    m.insert("IL", "Israel");
    m.insert("IM", "Isle Of Man");
    m.insert("IN", "India");
    m.insert("IO", "British Indian Ocean Territory");
    m.insert("IQ", "Iraq");
    m.insert("IR", "Iran");
    m.insert("IS", "Iceland");
    m.insert("IT", "Italy");
    m.insert("JE", "Jersey");
    m.insert("JM", "Jamaica");
    m.insert("JO", "Jordan");
    m.insert("JP", "Japan");
    m.insert("KE", "Kenya");
    m.insert("KG", "Kyrgyzstan");
    m.insert("KH", "Cambodia");
    m.insert("KI", "Kiribati");
    m.insert("KM", "Comoros");
    m.insert("KN", "Saint Kitts And Nevis");
    m.insert("KP", "North Korea");
    m.insert("KR", "South Korea");
    m.insert("KW", "Kuwait");
    m.insert("KY", "Cayman Islands");
    m.insert("KZ", "Kazakhstan");
    m.insert("LA", "Laos");
    m.insert("LB", "Lebanon");
    m.insert("LC", "Saint Lucia");
    m.insert("LI", "Liechtenstein");
    m.insert("LK", "Sri Lanka");
    m.insert("LR", "Liberia");
    m.insert("LS", "Lesotho");
    m.insert("LT", "Lithuania");
    m.insert("LU", "Luxembourg");
    m.insert("LV", "Latvia");
    m.insert("LY", "Libya");
    m.insert("MA", "Morocco");
    m.insert("MC", "Monaco");
    m.insert("MD", "Moldova");
    m.insert("ME", "Montenegro");
    m.insert("MF", "Saint Martin");
    m.insert("MG", "Madagascar");
    m.insert("MH", "Marshall Islands");
    m.insert("MK", "North Macedonia");
    m.insert("ML", "Mali");
    m.insert("MM", "Myanmar");
    m.insert("MN", "Mongolia");
    m.insert("MO", "Macao");
    m.insert("MP", "Northern Mariana Islands");
    m.insert("MQ", "Martinique");
    m.insert("MR", "Mauritania");
    m.insert("MS", "Montserrat");
    m.insert("MT", "Malta");
    m.insert("MU", "Mauritius");
    m.insert("MV", "Maldives");
    m.insert("MW", "Malawi");
    m.insert("MX", "Mexico");
    m.insert("MY", "Malaysia");
    m.insert("MZ", "Mozambique");
    m.insert("NA", "Namibia");
    m.insert("NC", "New Caledonia");
    m.insert("NE", "Niger");
    m.insert("NF", "Norfolk Island");
    m.insert("NG", "Nigeria");
    m.insert("NI", "Nicaragua");
    m.insert("NL", "Netherlands");
    m.insert("NO", "Norway");
    m.insert("NP", "Nepal");
    m.insert("NR", "Nauru");
    m.insert("NU", "Niue");
    m.insert("NZ", "New Zealand");
    m.insert("OM", "Oman");
    m.insert("PA", "Panama");
    m.insert("PE", "Peru");
    m.insert("PF", "French Polynesia");
    m.insert("PG", "Papua New Guinea");
    m.insert("PH", "Philippines");
    m.insert("PK", "Pakistan");
    m.insert("PL", "Poland");
    m.insert("PR", "Puerto Rico");
    m.insert("PT", "Portugal");
    m.insert("PY", "Paraguay");
    m.insert("QA", "Qatar");
    m.insert("RO", "Romania");
    m.insert("RS", "Serbia");
    m.insert("RU", "Russia");
    m.insert("RW", "Rwanda");
    m.insert("SA", "Saudi Arabia");
    m.insert("SE", "Sweden");
    m.insert("SG", "Singapore");
    m.insert("SI", "Slovenia");
    m.insert("SK", "Slovakia");
    m.insert("SN", "Senegal");
    m.insert("SO", "Somalia");
    m.insert("SS", "South Sudan");
    m.insert("SV", "El Salvador");
    m.insert("TH", "Thailand");
    m.insert("TR", "Türkiye");
    m.insert("TW", "Taiwan");
    m.insert("TZ", "Tanzania");
    m.insert("UA", "Ukraine");
    m.insert("UG", "Uganda");
    m.insert("US", "United States");
    m.insert("UY", "Uruguay");
    m.insert("UZ", "Uzbekistan");
    m.insert("VA", "Holy See");
    m.insert("VE", "Venezuela");
    m.insert("VN", "Viet Nam");
    m.insert("ZA", "South Africa");
    m.insert("ZM", "Zambia");
    m.insert("ZW", "Zimbabwe");
    m
});

#[derive(Debug, Clone)]
pub struct Opening {
    pub eco: &'static str,
    pub group: &'static str,
    pub subgroup: &'static str,
    pub name: &'static str,
    pub pgn: &'static str,
}

pub static OPENINGS: &[Opening] = &[
    Opening { eco: "B02", group: "Alekhine Defense", subgroup: "", name: "Alekhine Defense", pgn: "1. e4 Nf6" },
    Opening { eco: "B03", group: "Alekhine Defense", subgroup: "", name: "Alekhine Defense", pgn: "1. e4 Nf6 2. e5 Nd5 3. d4" },
    Opening { eco: "B03", group: "Alekhine Defense", subgroup: "", name: "Alekhine Defense", pgn: "1. e4 Nf6 2. e5 Nd5 3. d4 d6" },
    Opening { eco: "B03", group: "Alekhine Defense", subgroup: "", name: "Alekhine Defense", pgn: "1. e4 Nf6 2. e5 Nd5 3. d4 d6 4. c4" },
    Opening { eco: "B03", group: "Alekhine Defense", subgroup: "Balogh Variation", name: "Alekhine Defense: Balogh Variation", pgn: "1. e4 Nf6 2. e5 Nd5 3. d4 d6 4. Bc4" },
    Opening { eco: "B02", group: "Alekhine Defense", subgroup: "Brooklyn Variation", name: "Alekhine Defense: Brooklyn Variation", pgn: "1. e4 Nf6 2. e5 Ng8" },
    Opening { eco: "B02", group: "Alekhine Defense", subgroup: "Brooklyn Variation", name: "Alekhine Defense: Brooklyn Variation, Everglades Variation", pgn: "1. e4 Nf6 2. e5 Ng8 3. d4 f5" },
    Opening { eco: "B02", group: "Alekhine Defense", subgroup: "Buckley Attack", name: "Alekhine Defense: Buckley Attack", pgn: "1. e4 Nf6 2. e5 Nd5 3. Na3" },
    Opening { eco: "B03", group: "Alekhine Defense", subgroup: "Exchange Variation", name: "Alekhine Defense: Exchange Variation", pgn: "1. e4 Nf6 2. e5 Nd5 3. d4 d6 4. c4 Nb6 5. exd6" },
    Opening { eco: "B03", group: "Alekhine Defense", subgroup: "Exchange Variation", name: "Alekhine Defense: Exchange Variation, Karpov Variation", pgn: "1. e4 Nf6 2. e5 Nd5 3. d4 d6 4. c4 Nb6 5. exd6 cxd6 6. Nc3 g6 7. h3 Bg7 8. Nf3 O-O 9. Be2 Nc6 10. O-O Bf5 11. Bf4" },
    Opening { eco: "B03", group: "Alekhine Defense", subgroup: "Exchange Variation", name: "Alekhine Defense: Exchange Variation, Voronezh Variation", pgn: "1. e4 Nf6 2. e5 Nd5 3. d4 d6 4. c4 Nb6 5. exd6 cxd6 6. Nc3 g6 7. Be3 Bg7 8. Rc1 O-O 9. b3" },
    Opening { eco: "B03", group: "Alekhine Defense", subgroup: "Four Pawns Attack", name: "Alekhine Defense: Four Pawns Attack", pgn: "1. e4 Nf6 2. e5 Nd5 3. d4 d6 4. c4 Nb6 5. f4" },
    Opening { eco: "B03", group: "Alekhine Defense", subgroup: "Four Pawns Attack", name: "Alekhine Defense: Four Pawns Attack, Cambridge Gambit", pgn: "1. e4 Nf6 2. e5 Nd5 3. d4 d6 4. c4 Nb6 5. f4 g5" },
    Opening { eco: "B03", group: "Alekhine Defense", subgroup: "Four Pawns Attack", name: "Alekhine Defense: Four Pawns Attack, Fianchetto Variation", pgn: "1. e4 Nf6 2. e5 Nd5 3. d4 d6 4. c4 Nb6 5. f4 g6" },
    Opening { eco: "B03", group: "Alekhine Defense", subgroup: "Four Pawns Attack", name: "Alekhine Defense: Four Pawns Attack, Ilyin-Zhenevsky Variation", pgn: "1. e4 Nf6 2. e5 Nd5 3. d4 d6 4. c4 Nb6 5. f4 dxe5 6. fxe5 Nc6 7. Nf3 Bg4 8. e6 fxe6 9. c5" },
    Opening { eco: "B03", group: "Alekhine Defense", subgroup: "Four Pawns Attack", name: "Alekhine Defense: Four Pawns Attack, Korchnoi Variation", pgn: "1. e4 Nf6 2. e5 Nd5 3. d4 d6 4. c4 Nb6 5. f4 dxe5 6. fxe5 Bf5 7. Nc3 e6 8. Nf3 Be7 9. Be2 O-O 10. O-O f6" },
    Opening { eco: "B03", group: "Alekhine Defense", subgroup: "Four Pawns Attack", name: "Alekhine Defense: Four Pawns Attack, Main Line", pgn: "1. e4 Nf6 2. e5 Nd5 3. d4 d6 4. c4 Nb6 5. f4 dxe5 6. fxe5 Nc6 7. Be3" },
    Opening { eco: "B03", group: "Alekhine Defense", subgroup: "Four Pawns Attack", name: "Alekhine Defense: Four Pawns Attack, Tartakower Variation", pgn: "1. e4 Nf6 2. e5 Nd5 3. d4 d6 4. c4 Nb6 5. f4 dxe5 6. fxe5 Nc6 7. Be3 Bf5 8. Nc3 e6 9. Nf3 Qd7 10. Be2 O-O-O 11. O-O Be7" },
    Opening { eco: "B03", group: "Alekhine Defense", subgroup: "Four Pawns Attack", name: "Alekhine Defense: Four Pawns Attack, Trifunovic Variation", pgn: "1. e4 Nf6 2. e5 Nd5 3. d4 d6 4. c4 Nb6 5. f4 Bf5" },
    Opening { eco: "B03", group: "Alekhine Defense", subgroup: "Hunt Variation", name: "Alekhine Defense: Hunt Variation", pgn: "1. e4 Nf6 2. e5 Nd5 3. d4 d6 4. c4 Nb6 5. c5" },
    Opening { eco: "B02", group: "Alekhine Defense", subgroup: "Hunt Variation", name: "Alekhine Defense: Hunt Variation, Lasker Simul Gambit", pgn: "1. e4 Nf6 2. e5 Nd5 3. c4 Nb6 4. c5 Nd5 5. Bc4 e6 6. Nc3" },
    Opening { eco: "B02", group: "Alekhine Defense", subgroup: "Hunt Variation", name: "Alekhine Defense: Hunt Variation, Matsukevich Gambit", pgn: "1. e4 Nf6 2. e5 Nd5 3. c4 Nb6 4. c5 Nd5 5. Nc3 Nxc3 6. dxc3 d6 7. Bg5" },
    Opening { eco: "B02", group: "Alekhine Defense", subgroup: "Hunt Variation", name: "Alekhine Defense: Hunt Variation, Mikenas Gambit", pgn: "1. e4 Nf6 2. e5 Nd5 3. c4 Nb6 4. c5 Nd5 5. Bc4 e6 6. Nc3 d6 7. Nxd5 exd5 8. Bxd5" },
    Opening { eco: "B02", group: "Alekhine Defense", subgroup: "Kmoch Variation", name: "Alekhine Defense: Kmoch Variation", pgn: "1. e4 Nf6 2. e5 Nd5 3. Bc4 Nb6 4. Bb3 c5 5. d3" },
    Opening { eco: "B02", group: "Alekhine Defense", subgroup: "Krejcik Variation", name: "Alekhine Defense: Krejcik Variation", pgn: "1. e4 Nf6 2. Bc4" },
    Opening { eco: "B02", group: "Alekhine Defense", subgroup: "Krejcik Variation", name: "Alekhine Defense: Krejcik Variation, Krejcik Gambit", pgn: "1. e4 Nf6 2. Bc4 Nxe4 3. Bxf7+" },
    Opening { eco: "B02", group: "Alekhine Defense", subgroup: "Maróczy Variation", name: "Alekhine Defense: Maróczy Variation", pgn: "1. e4 Nf6 2. d3" },
    Opening { eco: "B04", group: "Alekhine Defense", subgroup: "Modern Variation", name: "Alekhine Defense: Modern Variation", pgn: "1. e4 Nf6 2. e5 Nd5 3. d4 d6 4. Nf3" },
    Opening { eco: "B04", group: "Alekhine Defense", subgroup: "Modern Variation", name: "Alekhine Defense: Modern Variation, Alburt Variation", pgn: "1. e4 Nf6 2. e5 Nd5 3. d4 d6 4. Nf3 g6" },
    Opening { eco: "B03", group: "Alekhine Defense", subgroup: "Modern Variation", name: "Alekhine Defense: Modern Variation, Alekhine Gambit", pgn: "1. e4 Nf6 2. e5 Nd5 3. d4 d6 4. c4 Nb6 5. Nf3 Bg4 6. Be2" },
    Opening { eco: "B05", group: "Alekhine Defense", subgroup: "Modern Variation", name: "Alekhine Defense: Modern Variation, Alekhine Variation", pgn: "1. e4 Nf6 2. e5 Nd5 3. d4 d6 4. Nf3 Bg4 5. c4" },
];
