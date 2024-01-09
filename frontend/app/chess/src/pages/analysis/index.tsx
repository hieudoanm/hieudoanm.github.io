import {
  Badge,
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  Heading,
  Input,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Textarea,
  Tr,
} from '@chakra-ui/react';
import { ANALYSE_API } from '@chess/common/environments';
import { logger } from '@chess/common/libs/logger';
import { chunk } from '@chess/common/utils/chunk';
import { Container } from '@chess/components/atoms/Container';
import { Layout } from '@chess/layout';
import axios from 'axios';
import { Chess, Move } from 'chess.js';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { Chessboard } from 'react-chessboard';
import { Square } from 'react-chessboard/dist/chessboard/types';

type AnalyseResponse = {
  centipawn: number;
  topMoves: { centipawn: number; moves: string[] }[];
};

const analyse = async (fen: string): Promise<AnalyseResponse> => {
  const url = `${ANALYSE_API}/analyse/fen`;
  try {
    const requestData = JSON.stringify({ fen, multi: 5 });
    const config = {
      url,
      method: 'POST',
      data: requestData,
      maxBodyLength: Number.POSITIVE_INFINITY,
      headers: { 'Content-Type': 'application/json' },
    };
    const { data } = await axios.request<AnalyseResponse>(config);
    return data;
  } catch (error) {
    logger.error(`analyse error=${error}`);
    return { centipawn: 0, topMoves: [] };
  }
};

const AnalysisPage: NextPage = () => {
  const [game, setGame] = useState(new Chess());
  const [{ fen, pgn }, setBoard] = useState({
    fen: game.fen(),
    pgn: game.pgn(),
  });
  const [evaluation, setEvaluation] = useState<
    AnalyseResponse & { loading: boolean }
  >({
    loading: true,
    centipawn: 0,
    topMoves: [],
  });

  const makeAMove = (
    sourceSquare: Square,
    targetSquare: Square
  ): Move | undefined => {
    try {
      const move = game.move(
        { from: sourceSquare, to: targetSquare, promotion: 'q' },
        { strict: true }
      );
      setGame(game);
      return move;
    } catch (error) {
      logger.error(`makeAMove error=${error}`);
      return;
    }
  };

  useEffect(() => {
    const analyseAsync = async (fen: string) => {
      setEvaluation({ ...evaluation, loading: true });
      const newEvaluation = await analyse(fen);
      setEvaluation({ ...newEvaluation, loading: false });
    };
    analyseAsync(fen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fen]);

  return (
    <Layout>
      <Container>
        <div className="py-4 md:py-8">
          <div className="grid grid-cols-1 gap-y-4 md:grid-cols-4 md:gap-x-8">
            <div className="col-span-2">
              <div className="flex flex-col gap-y-2 md:gap-y-4">
                <Chessboard
                  id="analysisBoard"
                  position={fen}
                  onPieceDrop={(sourceSquare: Square, targetSquare) => {
                    const move = makeAMove(sourceSquare, targetSquare);
                    const valid: boolean = move !== undefined;
                    if (valid) {
                      logger.info({ fen: game.fen(), pgn: game.pgn() });
                      setBoard({ fen: game.fen(), pgn: game.pgn() });
                    }
                    return valid;
                  }}
                />
                <Table>
                  <Tbody>
                    <Tr>
                      <Td className="border-0 p-0 pb-2 md:pb-4">FEN</Td>
                      <Td className="border-0 p-0 pb-2 md:pb-4">
                        <Input
                          id="fen"
                          name="fen"
                          placeholder="FEN"
                          defaultValue={fen}
                          className="w-full"
                        />
                      </Td>
                    </Tr>
                    <Tr>
                      <Td className="border-0 p-0" verticalAlign="top">
                        PGN
                      </Td>
                      <Td className="border-0 p-0">
                        <Textarea
                          id="pgn"
                          name="pgn"
                          placeholder="PGN"
                          defaultValue={pgn}
                          className="w-full"
                          noOfLines={2}
                        />
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </div>
            </div>
            <div className="col-span-2">
              <Card className="min-h-full border border-gray-200">
                <CardHeader>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Heading className="text-xl">Analysis Board</Heading>
                    <Button
                      size="sm"
                      colorScheme="teal"
                      onClick={() => {
                        setGame(new Chess());
                        setBoard({ fen: '', pgn: '' });
                      }}
                    >
                      Reset
                    </Button>
                  </Box>
                </CardHeader>
                <Divider />
                {evaluation.loading ? (
                  <Box className="border-b py-2 text-center">
                    <Spinner size="xs" />
                  </Box>
                ) : (
                  <TableContainer>
                    <Table>
                      <Tbody>
                        {evaluation.topMoves.map(
                          ({ centipawn = 0, moves = [] }) => {
                            const moveNumber: number = game.moveNumber();
                            const turn: string = game.turn();
                            const clonedMoves = JSON.parse(
                              JSON.stringify(moves)
                            );
                            if (turn === 'b') {
                              clonedMoves.unshift('...');
                            }
                            const fullMoves: string[][] = chunk(clonedMoves, 2);
                            const movesString = fullMoves
                              .map(([white, black], index: number) => {
                                const nextMoveNumber: number =
                                  moveNumber + index;
                                const whiteMove: string = white ?? '';
                                const blackMove: string = black ?? '';
                                return `${nextMoveNumber}. ${whiteMove} ${blackMove}`;
                              })
                              .join(' ')
                              .trim();
                            return (
                              <Tr key={moves.join('-')}>
                                <Td className="w-4 px-2 py-1">
                                  <Badge colorScheme="teal" textAlign="center">
                                    <pre>{(centipawn / 100).toFixed(2)}</pre>
                                  </Badge>
                                </Td>
                                <Td className="p-1 pl-0">
                                  <Text
                                    className="w-full overflow-hidden truncate"
                                    dangerouslySetInnerHTML={{
                                      __html: movesString,
                                    }}
                                  />
                                </Td>
                              </Tr>
                            );
                          }
                        )}
                      </Tbody>
                    </Table>
                  </TableContainer>
                )}
                <Table>
                  <Tbody>
                    {chunk(game.history(), 2).map(
                      ([white, black]: string[], index: number) => {
                        return (
                          <Tr key={`${index}-${white}-${black}`}>
                            <Td isNumeric className="w-10 p-2">
                              {index + 1}.
                            </Td>
                            <Td className="p-2">{white}</Td>
                            <Td className="p-2">{black}</Td>
                          </Tr>
                        );
                      }
                    )}
                  </Tbody>
                </Table>
              </Card>
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default AnalysisPage;
