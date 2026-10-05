"""Core pipeline logic."""

from .baselines import (
    BaselineModel,
    GradientBoostingBaseline,
    LogisticRegressionBaseline,
    cross_validate_baseline,
    evaluate_baseline,
    train_baseline,
)
from .cohort import CohortBuilder, SessionRule, create_cohort_from_tsv
from .doctor import check_dependencies, check_system, get_device_info
from .events import EventWriter, filter_events_by_stage, filter_events_by_type, read_events
from .latex import to_latex_table
from .lockbox import LockBoxLogger, get_default_lockbox_log_path
from .metrics import (
    calculate_calibration_metrics,
    calculate_confidence_interval,
    calculate_confusion_matrix,
    calculate_metrics,
    calculate_metrics_with_ci,
)
from .null_test import (
    calibrate_df_scaling,
    normal_null_scores,
    null_simulation_test,
    simulate_null_scores,
)
from .reports import (
    create_calibration_table,
    create_comparison_table,
    create_metrics_table,
    create_significance_table,
    generate_all_reports,
)
from .runs import (
    create_manifest,
    create_run_folder,
    generate_run_id,
    list_runs,
    load_manifest,
    save_config,
    update_manifest_end_time,
)
from .split import Splitter, verify_no_leakage
from .stats import (
    benjamini_hochberg_fdr,
    bootstrap_ci,
    compare_models,
    corrected_paired_t_test,
    paired_t_test,
    wilcoxon_signed_rank_test,
)

__all__ = [
    "check_system",
    "check_dependencies",
    "get_device_info",
    "generate_run_id",
    "create_run_folder",
    "create_manifest",
    "update_manifest_end_time",
    "save_config",
    "load_manifest",
    "list_runs",
    "EventWriter",
    "read_events",
    "filter_events_by_type",
    "filter_events_by_stage",
    "CohortBuilder",
    "SessionRule",
    "create_cohort_from_tsv",
    "Splitter",
    "verify_no_leakage",
    "LockBoxLogger",
    "get_default_lockbox_log_path",
    "calculate_metrics",
    "calculate_metrics_with_ci",
    "calculate_calibration_metrics",
    "calculate_confidence_interval",
    "calculate_confusion_matrix",
    "paired_t_test",
    "corrected_paired_t_test",
    "benjamini_hochberg_fdr",
    "wilcoxon_signed_rank_test",
    "bootstrap_ci",
    "compare_models",
    "null_simulation_test",
    "simulate_null_scores",
    "normal_null_scores",
    "calibrate_df_scaling",
    "BaselineModel",
    "LogisticRegressionBaseline",
    "GradientBoostingBaseline",
    "train_baseline",
    "evaluate_baseline",
    "cross_validate_baseline",
    "create_metrics_table",
    "create_comparison_table",
    "create_significance_table",
    "create_calibration_table",
    "to_latex_table",
    "generate_all_reports",
]
