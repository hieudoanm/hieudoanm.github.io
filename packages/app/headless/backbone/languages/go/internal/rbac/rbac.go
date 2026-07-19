// Package rbac provides Role-Based Access Control model and persistence helpers.
package rbac

import (
	"database/sql"
	"time"
)

// Permission is a row from _permissions.
type Permission struct {
	ID         string `json:"id"`
	UserID     string `json:"user_id"`
	Collection string `json:"collection"`
	Role       string `json:"role"`
	CreatedAt  string `json:"created_at"`
	UpdatedAt  string `json:"updated_at"`
}

// ListPermissions returns all permission rows.
func ListPermissions(db *sql.DB) ([]Permission, error) {
	rows, err := db.Query(`SELECT id, user_id, collection, role, created_at, updated_at FROM _permissions ORDER BY collection, user_id`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var perms []Permission
	for rows.Next() {
		var p Permission
		if err := rows.Scan(&p.ID, &p.UserID, &p.Collection, &p.Role, &p.CreatedAt, &p.UpdatedAt); err != nil {
			return nil, err
		}
		perms = append(perms, p)
	}
	return perms, rows.Err()
}

// UpsertPermission creates or replaces the role for (userID, collection).
func UpsertPermission(db *sql.DB, id, userID, collection, role string) (*Permission, error) {
	now := time.Now().UTC().Format(time.RFC3339)
	_, err := db.Exec(
		`INSERT INTO _permissions (id, user_id, collection, role, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)
		ON CONFLICT(user_id, collection) DO UPDATE SET role = excluded.role, updated_at = excluded.updated_at`,
		id, userID, collection, role, now, now,
	)
	if err != nil {
		return nil, err
	}
	return &Permission{ID: id, UserID: userID, Collection: collection, Role: role, CreatedAt: now, UpdatedAt: now}, nil
}

// DeletePermission removes a single permission by ID.
func DeletePermission(db *sql.DB, id string) (bool, error) {
	res, err := db.Exec(`DELETE FROM _permissions WHERE id = ?`, id)
	if err != nil {
		return false, err
	}
	n, _ := res.RowsAffected()
	return n > 0, nil
}
