import { DocumentNode, gql, useQuery } from '@apollo/client';
import { Insights } from '@chess/app/api/chess/players/[username]/insights/model';
import { CHESS_USERNAME } from '@chess/common/constants/chess.constants';
import { PlayerInsightsTemplate } from '@chess/shared/templates/PlayerInsightsTemplate';
import {
  ChessPlayer,
  ChessTimeClass,
  ChessTitleAbbreviation,
  ChessVariant,
} from '@prisma/client';
import { withExpoSnack } from 'nativewind';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const playerInsightsQuery: DocumentNode = gql`
  query PlayerQuery($username: String!, $timeClass: String, $variant: String) {
    chess {
      player(username: $username, timeClass: $timeClass, variant: $variant) {
        username
        avatar
        title
        name
        insights {
          accuracy {
            average
            win
            draw
            loss
            periods {
              average
              period
            }
            timeOfDays {
              average
              timeOfDay
            }
            daysOfWeek {
              average
              dayOfWeek
            }
          }
          games {
            total
            win
            draw
            loss
            periods {
              games
              period
            }
            timeOfDays {
              games
              timeOfDay
            }
            daysOfWeek {
              games
              dayOfWeek
            }
          }
          opponents {
            opponent
            games
            win
            draw
            loss
          }
          results {
            win {
              result
              count
            }
            draw {
              result
              count
            }
            loss {
              result
              count
            }
            timeOfDays {
              win
              draw
              loss
              timeOfDay
            }
            daysOfWeek {
              win
              draw
              loss
              dayOfWeek
            }
          }
        }
      }
    }
  }
`;

type PlayerData = { chess: { player: ChessPlayer & { insights: Insights } } };

export const InsightsPage: React.FC = () => {
  const username = CHESS_USERNAME;
  const timeClass = ChessTimeClass.blitz;
  const variant = ChessVariant.chess;

  const {
    loading = true,
    error,
    data,
  } = useQuery<PlayerData>(playerInsightsQuery, {
    variables: { username, timeClass, variant },
  });

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error {error.message}</Text>
      </View>
    );
  }

  const title: ChessTitleAbbreviation =
    data?.chess?.player?.title ?? ('' as ChessTitleAbbreviation);
  const avatar: string = data?.chess?.player?.avatar ?? '';
  const name: string = data?.chess?.player?.name ?? '';
  const insights = data?.chess?.player?.insights;

  return (
    <View style={{ backgroundColor: '#ffffff', overflow: 'scroll' }}>
      <PlayerInsightsTemplate
        insights={insights}
        username={username}
        avatar={avatar}
        title={title}
        name={name}
        mobile
      />
    </View>
  );
};

export default withExpoSnack(InsightsPage);
