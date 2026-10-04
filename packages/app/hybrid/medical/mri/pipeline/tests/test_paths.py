"""Tests for environment- and user-aware path resolution."""

from pathlib import Path

import pytest

from pipeline.core.paths import expand_path


def test_expands_a_set_environment_variable(monkeypatch: pytest.MonkeyPatch):
    monkeypatch.setenv("ARC_DATA_PATH", "/datasets/ds004884")

    resolved = expand_path("${ARC_DATA_PATH}/participants.tsv")

    assert resolved == Path("/datasets/ds004884/participants.tsv")


def test_expands_the_bare_variable_form(monkeypatch: pytest.MonkeyPatch):
    monkeypatch.setenv("ARC_DATA_PATH", "/datasets/ds004884")

    assert expand_path("$ARC_DATA_PATH") == Path("/datasets/ds004884")


def test_expands_the_user_directory(monkeypatch: pytest.MonkeyPatch):
    monkeypatch.setenv("HOME", "/home/researcher")

    assert expand_path("~/data") == Path("/home/researcher/data")


def test_refuses_an_unset_environment_variable(monkeypatch: pytest.MonkeyPatch):
    monkeypatch.delenv("ARC_DATA_PATH", raising=False)

    with pytest.raises(ValueError, match="unresolved environment variable"):
        expand_path("${ARC_DATA_PATH}/participants.tsv")


def test_leaves_a_plain_relative_path_alone():
    assert expand_path("data/synthetic/participants.tsv") == Path(
        "data/synthetic/participants.tsv"
    )
