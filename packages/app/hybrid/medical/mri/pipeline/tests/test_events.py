"""Tests for the JSONL event writer and its readers."""

from pathlib import Path

import pytest

from pipeline.core.events import (
    EventWriter,
    filter_events_by_stage,
    filter_events_by_type,
    read_events,
)


def test_read_events_returns_empty_without_a_file(tmp_path: Path):
    assert read_events(tmp_path) == []


def test_read_events_skips_blank_lines(tmp_path: Path):
    (tmp_path / "events.jsonl").write_text(
        '{"type": "a"}\n\n   \n{"type": "b"}\n'
    )

    events = read_events(tmp_path)

    assert [event["type"] for event in events] == ["a", "b"]


def test_write_event_stamps_a_timestamp(tmp_path: Path):
    EventWriter(tmp_path).write_event({"type": "custom"})

    events = read_events(tmp_path)

    assert events[0]["type"] == "custom"
    assert "timestamp" in events[0]


def test_stage_and_metric_events_round_trip(tmp_path: Path):
    writer = EventWriter(tmp_path)
    writer.write_stage_start("data", "r1")
    writer.write_metric("data", "n_participants", 24.0)
    writer.write_stage_end("data")

    events = read_events(tmp_path)

    assert [event["type"] for event in events] == ["stage_start", "metric", "stage_end"]
    assert events[0]["run_id"] == "r1"
    assert events[1]["name"] == "n_participants"
    assert "fold" not in events[1]
    assert events[2]["status"] == "ok"


def test_write_progress_includes_only_the_given_fields(tmp_path: Path):
    writer = EventWriter(tmp_path)
    writer.write_progress("train", seed=3, fold=1, epoch=12, loss=0.41, note="x")
    writer.write_progress("train")

    events = filter_events_by_type(read_events(tmp_path), "progress")

    assert events[0]["seed"] == 3
    assert events[0]["epoch"] == 12
    assert events[0]["note"] == "x"
    assert set(events[1]) == {"type", "stage", "timestamp"}


def test_write_error_records_the_message(tmp_path: Path):
    EventWriter(tmp_path).write_error("train", "boom", fold=2)

    events = read_events(tmp_path)

    assert events[0]["type"] == "error"
    assert events[0]["error"] == "boom"
    assert events[0]["fold"] == 2


def test_stage_context_writes_ok_on_success(tmp_path: Path):
    writer = EventWriter(tmp_path)

    with writer.stage_context("data", "r1"):
        pass

    events = read_events(tmp_path)

    assert [event["type"] for event in events] == ["stage_start", "stage_end"]
    assert events[1]["status"] == "ok"


def test_stage_context_records_and_reraises_an_error(tmp_path: Path):
    writer = EventWriter(tmp_path)

    with pytest.raises(RuntimeError, match="boom"):
        with writer.stage_context("split", "r1"):
            raise RuntimeError("boom")

    kinds = [event["type"] for event in read_events(tmp_path)]

    assert kinds == ["stage_start", "error", "stage_end"]
    assert filter_events_by_stage(read_events(tmp_path), "split")[-1]["status"] == "error"
