"""Tests for cohort construction.

The split unit is the participant, so the central guarantee here is that the
cohort holds exactly one row per participant no matter how many sessions the
source table listed.
"""

import pandas as pd
import pytest

from pipeline.core.cohort import (
    CohortBuilder,
    SessionRule,
    create_cohort_from_tsv,
)


@pytest.fixture
def multi_session():
    """Three participants, three sessions each, only ses-2 measured."""
    rows = []
    for participant in ("sub-1", "sub-2", "sub-3"):
        for session, wab, t1 in ((1, None, "t1a"), (2, 80.0, "t1b"), (3, None, "t1c")):
            rows.append({
                "participant_id": participant,
                "session_id": f"ses-{session}",
                "wab_aq": wab,
                "t1_path": t1,
                "lesion_mask_path": f"{participant}-ses-{session}.nii.gz",
            })
    return pd.DataFrame(rows)


def write(frame: pd.DataFrame, path) -> str:
    frame.to_csv(path, sep="\t", index=False)
    return str(path)


def builder(frame: pd.DataFrame, tmp_path, rule: SessionRule) -> CohortBuilder:
    return CohortBuilder(write(frame, tmp_path / "participants.tsv"), session_rule=rule)


def test_first_session_is_kept(multi_session, tmp_path):
    cohort = builder(multi_session, tmp_path, SessionRule.FIRST).apply_session_rule(multi_session)

    assert sorted(cohort["session_id"]) == ["ses-1", "ses-1", "ses-1"]


def test_last_session_is_kept(multi_session, tmp_path):
    cohort = builder(multi_session, tmp_path, SessionRule.LAST).apply_session_rule(multi_session)

    assert sorted(cohort["session_id"]) == ["ses-3", "ses-3", "ses-3"]


def test_the_measured_session_wins(multi_session, tmp_path):
    cohort = builder(multi_session, tmp_path, SessionRule.WITH_WAB_AQ).apply_session_rule(
        multi_session
    )

    assert sorted(cohort["session_id"]) == ["ses-2", "ses-2", "ses-2"]
    assert cohort["wab_aq"].notna().all()


def test_a_session_rule_needing_an_absent_column_is_refused(multi_session, tmp_path):
    frame = multi_session.drop(columns=["lesion_mask_path"])

    with pytest.raises(ValueError, match="lesion_mask_path"):
        builder(frame, tmp_path, SessionRule.WITH_LESION).apply_session_rule(frame)


def test_every_participant_appears_exactly_once(multi_session, tmp_path):
    for rule in SessionRule:
        cohort = builder(multi_session, tmp_path, rule).apply_session_rule(multi_session)
        assert cohort["participant_id"].is_unique, rule


def test_a_table_without_sessions_passes_through(tmp_path):
    frame = pd.DataFrame({
        "participant_id": ["sub-1", "sub-2"],
        "wab_aq": [50.0, 70.0],
    })

    cohort = builder(frame, tmp_path, SessionRule.FIRST).apply_session_rule(frame)

    assert len(cohort) == 2


def test_duplicate_rows_without_a_session_column_are_refused(tmp_path):
    frame = pd.DataFrame({
        "participant_id": ["sub-1", "sub-1", "sub-2"],
        "wab_aq": [50.0, 60.0, 70.0],
    })

    with pytest.raises(ValueError, match="no session column"):
        builder(frame, tmp_path, SessionRule.FIRST).apply_session_rule(frame)


def test_build_returns_one_row_per_participant(multi_session, tmp_path):
    cohort = builder(multi_session, tmp_path, SessionRule.FIRST).build()

    assert cohort["participant_id"].is_unique
    assert len(cohort) == 3


def test_build_drops_participants_missing_a_required_column(multi_session, tmp_path):
    cohort = builder(multi_session, tmp_path, SessionRule.WITH_WAB_AQ).build(
        required_columns=["wab_aq", "t1_path"]
    )

    assert len(cohort) == 3
    assert cohort["wab_aq"].notna().all()


def test_unknown_session_rule_is_refused():
    with pytest.raises(ValueError):
        SessionRule("best_session")


def test_save_and_get_participant_ids(multi_session, tmp_path):
    instance = builder(multi_session, tmp_path, SessionRule.FIRST)
    instance.build()

    assert instance.get_cohort_size() == 3
    assert sorted(instance.get_participant_ids()) == ["sub-1", "sub-2", "sub-3"]

    instance.save_cohort(str(tmp_path / "cohort" / "cohort.tsv"))
    assert (tmp_path / "cohort" / "cohort.tsv").is_file()


def test_participants_are_unavailable_before_building(tmp_path):
    instance = CohortBuilder(str(tmp_path / "absent.tsv"))

    with pytest.raises(ValueError, match="not built yet"):
        instance.get_cohort_size()


def test_missing_file_is_reported(tmp_path):
    with pytest.raises(FileNotFoundError):
        CohortBuilder(str(tmp_path / "absent.tsv")).build()


def test_table_without_participant_id_is_refused(tmp_path):
    frame = pd.DataFrame({"wab_aq": [1.0, 2.0]})

    with pytest.raises(ValueError, match="participant_id"):
        create_cohort_from_tsv(write(frame, tmp_path / "participants.tsv"))
