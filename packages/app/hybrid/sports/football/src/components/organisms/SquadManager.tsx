'use client';

import { Tabs, TabItem } from '@/components/atoms/Tabs';
import { FormationPresets } from '@/components/molecules/FormationPresets';
import { FormationReminder } from '@/components/molecules/FormationReminder';
import { FormationSelector } from '@/components/molecules/FormationSelector';
import { FormationSuggestions } from '@/components/molecules/FormationSuggestions';
import { ImportExport } from '@/components/molecules/ImportExport';
import { Lineups } from '@/components/molecules/Lineups';
import { MatchCenter } from '@/components/molecules/MatchCenter';
import { Pitch } from '@/components/molecules/Pitch';
import { PlayerPicker } from '@/components/molecules/PlayerPicker';
import { PlayerRoster } from '@/components/molecules/PlayerRoster';
import { Presentation } from '@/components/molecules/Presentation';
import { RosterImport } from '@/components/molecules/RosterImport';
import { SquadLibrary } from '@/components/molecules/SquadLibrary';
import { TeamKit } from '@/components/molecules/TeamKit';
import { TeamSheet } from '@/components/molecules/TeamSheet';
import { TeamSheetPrint } from '@/components/molecules/TeamSheetPrint';
import { TeamStats } from '@/components/molecules/TeamStats';
import { useMatch } from '@/hooks/useMatch';
import { useSquad } from '@/hooks/useSquad';
import { MAX_SQUAD_SIZE } from '@/lib/formations';
import { slotPlayers } from '@/lib/squad';
import { FC, useRef, useState } from 'react';

export const SquadManager: FC = () => {
  const pitchRef = useRef<HTMLDivElement>(null);
  const [tabId, setTabId] = useState('overview');
  const [sheetOpponent, setSheetOpponent] = useState('');
  const [sheetDate, setSheetDate] = useState('');
  const {
    library,
    squad,
    formation,
    selectedSlotId,
    exampleStatus,
    examples,
    exampleId,
    selectSlot,
    selectFormation,
    selectSize,
    selectExample,
    setActiveSquad,
    addSquad,
    renameSquad,
    duplicateSquad,
    removeSquad,
    addPlayer,
    updatePlayer,
    removePlayer,
    replacePlayers,
    toggleAssignment,
    toggleBench,
    toggleLeadership,
    substitutePlayer,
    clearSlot,
    swapSlots,
    replaceSquad,
    loadExample,
    addPreset,
    removePreset,
    saveLineup,
    applyLineup,
    renameLineup,
    removeLineup,
    toggleMirrored,
    shiftLine,
    setPrimaryColor,
  } = useSquad();

  const matchController = useMatch({
    onHalfTime: () => {
      if (!squad.mirrored) toggleMirrored();
    },
  });

  const selectedSlot =
    formation.slots.find((slot) => slot.id === selectedSlotId) ?? null;

  const getSlotPlayers = (slotId: string) => slotPlayers(squad, slotId);

  const tabs: TabItem[] = [
    {
      id: 'overview',
      label: 'Overview',
      content: (
        <div className="flex flex-col gap-3">
          <MatchCenter controller={matchController} />
          <FormationReminder squad={squad} formation={formation} />
        </div>
      ),
    },
    {
      id: 'library',
      label: 'Library',
      content: (
        <SquadLibrary
          library={library}
          activeSquadName={squad.name}
          onSelect={setActiveSquad}
          onAdd={addSquad}
          onRename={renameSquad}
          onDuplicate={duplicateSquad}
          onRemove={removeSquad}
        />
      ),
    },
    {
      id: 'position',
      label: 'Position',
      content: selectedSlot ? (
        <PlayerPicker
          slot={selectedSlot}
          assigned={getSlotPlayers(selectedSlot.id)}
          allPlayers={squad.players}
          benchPlayers={squad.players.filter((player) => player.bench === true)}
          slots={formation.slots}
          onToggle={toggleAssignment}
          onClear={clearSlot}
          onSwap={swapSlots}
          onSubstitute={(slotId, benchPlayerId) => {
            substitutePlayer(slotId, benchPlayerId);
            const benchPlayer = squad.players.find(
              (player) => player.id === benchPlayerId
            );
            matchController.recordSubstitution(benchPlayer?.name);
          }}
        />
      ) : (
        <p className="text-base-content/50 text-xs">
          Select a position on the pitch to manage its players.
        </p>
      ),
    },
    {
      id: 'roster',
      label: 'Roster',
      content: (
        <div className="flex flex-col gap-3">
          <PlayerRoster
            players={squad.players}
            maxPlayers={MAX_SQUAD_SIZE[formation.size]}
            onAdd={addPlayer}
            onUpdate={updatePlayer}
            onRemove={removePlayer}
            onToggleBench={toggleBench}
            onToggleLeadership={toggleLeadership}
            positionOptions={[
              ...new Set(formation.slots.map((slot) => slot.label)),
            ]}
            examples={examples}
            exampleId={exampleId}
            onSelectExample={selectExample}
            onLoadExample={loadExample}
            exampleStatus={exampleStatus}
          />
          <RosterImport onImport={replacePlayers} />
        </div>
      ),
    },
    {
      id: 'team',
      label: 'Team',
      content: (
        <div className="flex flex-col gap-3">
          <TeamKit value={squad.primaryColor} onChange={setPrimaryColor} />
          <TeamSheet
            squad={squad}
            formation={formation}
            opponent={sheetOpponent}
            date={sheetDate}
            onOpponentChange={setSheetOpponent}
            onDateChange={setSheetDate}
            onPrint={() => window.print()}
          />
        </div>
      ),
    },
    {
      id: 'stats',
      label: 'Stats',
      content: (
        <div className="flex flex-col gap-3">
          <TeamStats squad={squad} formation={formation} />
          <FormationSuggestions
            squad={squad}
            formation={formation}
            onApply={selectFormation}
          />
        </div>
      ),
    },
    {
      id: 'plans',
      label: 'Plans',
      content: (
        <div className="flex flex-col gap-3">
          <FormationPresets
            squad={squad}
            onSave={addPreset}
            onApply={selectFormation}
            onRemove={removePreset}
          />
          <Lineups
            squad={squad}
            onSave={saveLineup}
            onApply={applyLineup}
            onRename={renameLineup}
            onRemove={removeLineup}
          />
        </div>
      ),
    },
    {
      id: 'export',
      label: 'Export',
      content: (
        <div className="flex flex-col gap-3">
          <ImportExport
            players={squad.players}
            squadName={squad.name}
            squad={squad}
            onImport={replacePlayers}
            onImportSquad={replaceSquad}
          />
          <Presentation squad={squad} pitchRef={pitchRef} />
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="grid h-full grid-cols-1 gap-4 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <div className="flex flex-col items-center gap-4 print:gap-0">
          <FormationSelector
            formation={formation}
            onSelectFormation={selectFormation}
            onSelectSize={selectSize}
          />
          <div className="print-pitch w-full">
            <Pitch
              formation={formation}
              selectedSlotId={selectedSlotId}
              onSelectSlot={selectSlot}
              getSlotPlayers={getSlotPlayers}
              onSwapSlots={swapSlots}
              mirrored={squad.mirrored}
              onToggleMirrored={toggleMirrored}
              onShiftLine={shiftLine}
              teamColor={squad.primaryColor}
              pitchRef={pitchRef}
            />
          </div>
        </div>

        <div className="flex min-h-0 flex-col gap-4 overflow-y-auto print:hidden">
          <Tabs items={tabs} activeId={tabId} onChange={setTabId} />
        </div>
      </div>

      <TeamSheetPrint
        squad={squad}
        formation={formation}
        opponent={sheetOpponent}
        date={sheetDate}
      />
    </>
  );
};

SquadManager.displayName = 'SquadManager';
