"""Core pipeline logic."""

from .doctor import check_system, check_dependencies, get_device_info
from .runs import (
    generate_run_id,
    create_run_folder,
    create_manifest,
    update_manifest_end_time,
    save_config,
    load_manifest,
    list_runs,
)
from .events import EventWriter, read_events, filter_events_by_type, filter_events_by_stage
from .cohort import CohortBuilder, SessionRule, create_cohort_from_tsv
from .split import Splitter, verify_no_leakage
from .lockbox import LockBoxLogger, get_default_lockbox_log_path
from .metrics import (
    calculate_metrics,
    calculate_metrics_with_ci,
    calculate_calibration_metrics,
    calculate_confidence_interval,
    calculate_confusion_matrix,
)
from .stats import (
    paired_t_test,
    corrected_paired_t_test,
    benjamini_hochberg_fdr,
    wilcoxon_signed_rank_test,
    bootstrap_ci,
    compare_models,
)
from .null_test import (
    null_simulation_test,
    generate_null_scores_normal,
    calibrate_df_scaling,
)
from .baselines import (
    BaselineModel,
    LogisticRegressionBaseline,
    GradientBoostingBaseline,
    train_baseline,
    evaluate_baseline,
    cross_validate_baseline,
)
from .reports import (
    create_metrics_table,
    create_comparison_table,
    create_significance_table,
    create_calibration_table,
    generate_all_reports,
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
    "generate_null_scores_normal",
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
    "generate_all_reports",
]
