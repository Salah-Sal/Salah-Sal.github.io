#!/usr/bin/env python3
"""Merge masader assessment JSONs with metadata JSONs into a single file for the blog."""

import argparse
import json
import sys
from pathlib import Path

METADATA_FIELDS = [
    "Year", "Tasks", "Form", "Volume", "Unit", "License",
    "HF Link", "Paper Link", "Domain", "Authors", "Dialect",
    "Access", "Venue Type",
]


def merge_dataset(assessment_path, metadata_dir):
    """Merge one assessment file with its matching metadata file."""
    slug = assessment_path.stem.replace("_assessment", "")
    metadata_path = metadata_dir / f"{slug}.json"

    with open(assessment_path, "r", encoding="utf-8") as f:
        assessment = json.load(f)

    entry = {"slug": slug}
    entry.update(assessment)

    if metadata_path.exists():
        with open(metadata_path, "r", encoding="utf-8") as f:
            metadata = json.load(f)
        for field in METADATA_FIELDS:
            if field in metadata:
                entry[field] = metadata[field]
    else:
        print(f"  Warning: no metadata for {slug}", file=sys.stderr)

    return entry


def main():
    parser = argparse.ArgumentParser(description="Merge masader assessments with metadata")
    parser.add_argument("--assessments", required=True, help="Directory of *_assessment.json files")
    parser.add_argument("--metadata", required=True, help="Directory of dataset metadata JSONs")
    parser.add_argument("--output", required=True, help="Output JSON file path")
    args = parser.parse_args()

    assessments_dir = Path(args.assessments)
    metadata_dir = Path(args.metadata)
    output_path = Path(args.output)

    assessment_files = sorted(assessments_dir.glob("*_assessment.json"))
    if not assessment_files:
        print(f"No assessment files found in {assessments_dir}", file=sys.stderr)
        sys.exit(1)

    datasets = []
    for af in assessment_files:
        try:
            entry = merge_dataset(af, metadata_dir)
            datasets.append(entry)
        except (json.JSONDecodeError, KeyError) as e:
            print(f"  Error processing {af.name}: {e}", file=sys.stderr)

    datasets.sort(key=lambda d: d.get("درجة_الجودة", 0), reverse=True)

    output_path.parent.mkdir(parents=True, exist_ok=True)
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(datasets, f, ensure_ascii=False, indent=2)

    print(f"Merged {len(datasets)} datasets → {output_path}")


if __name__ == "__main__":
    main()
