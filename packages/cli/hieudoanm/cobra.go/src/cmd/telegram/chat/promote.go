package chat

import (
	"encoding/json"
	"fmt"

	"github.com/hieudoanm/jack/src/cmd/telegram/internal"
	"github.com/hieudoanm/jack/src/libs/requests"
	"github.com/spf13/cobra"
)

func newPromoteCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:     "promote",
		Short:   "Promote a user in a chat",
		Long:    `Promote or demote a user to become an administrator in a supergroup or channel.`,
		Example: `  telegram chat promote --chat-id @channel --user-id 123456789 --can-delete-messages --can-invite-users`,
		RunE: func(cmd *cobra.Command, args []string) error {
			jsonOutput, _ := cmd.Flags().GetBool("json")

			token, err := internal.ResolveToken(cmd)
			if err != nil {
				return err
			}

			chatID, _ := cmd.Flags().GetString("chat-id")
			userID, _ := cmd.Flags().GetInt64("user-id")
			isAnonymous, _ := cmd.Flags().GetBool("is-anonymous")
			canManageChat, _ := cmd.Flags().GetBool("can-manage-chat")
			canDeleteMessages, _ := cmd.Flags().GetBool("can-delete-messages")
			canManageVideoChats, _ := cmd.Flags().GetBool("can-manage-video-chats")
			canRestrictMembers, _ := cmd.Flags().GetBool("can-restrict-members")
			canPromoteMembers, _ := cmd.Flags().GetBool("can-promote-members")
			canChangeInfo, _ := cmd.Flags().GetBool("can-change-info")
			canInviteUsers, _ := cmd.Flags().GetBool("can-invite-users")
			canPostStories, _ := cmd.Flags().GetBool("can-post-stories")
			canEditStories, _ := cmd.Flags().GetBool("can-edit-stories")
			canDeleteStories, _ := cmd.Flags().GetBool("can-delete-stories")
			canPostMessages, _ := cmd.Flags().GetBool("can-post-messages")
			canEditMessages, _ := cmd.Flags().GetBool("can-edit-messages")
			canPinMessages, _ := cmd.Flags().GetBool("can-pin-messages")
			canPostStory, _ := cmd.Flags().GetBool("can-post-story")
			canManageTopics, _ := cmd.Flags().GetBool("can-manage-topics")

			if chatID == "" {
				return fmt.Errorf("--chat-id is required")
			}
			if userID == 0 {
				return fmt.Errorf("--user-id is required")
			}

			body := map[string]interface{}{
				"chat_id": chatID,
				"user_id": userID,
			}
			if isAnonymous {
				body["is_anonymous"] = true
			}
			if canManageChat {
				body["can_manage_chat"] = true
			}
			if canDeleteMessages {
				body["can_delete_messages"] = true
			}
			if canManageVideoChats {
				body["can_manage_video_chats"] = true
			}
			if canRestrictMembers {
				body["can_restrict_members"] = true
			}
			if canPromoteMembers {
				body["can_promote_members"] = true
			}
			if canChangeInfo {
				body["can_change_info"] = true
			}
			if canInviteUsers {
				body["can_invite_users"] = true
			}
			if canPostStories {
				body["can_post_stories"] = true
			}
			if canEditStories {
				body["can_edit_stories"] = true
			}
			if canDeleteStories {
				body["can_delete_stories"] = true
			}
			if canPostMessages {
				body["can_post_messages"] = true
			}
			if canEditMessages {
				body["can_edit_messages"] = true
			}
			if canPinMessages {
				body["can_pin_messages"] = true
			}
			if canPostStory {
				body["can_post_story"] = true
			}
			if canManageTopics {
				body["can_manage_topics"] = true
			}

			url := internal.TelegramAPIURL(token, "promoteChatMember")
			responseByte, postErr := requests.Post(url, requests.Options{Body: body})
			if postErr != nil {
				return postErr
			}

			if jsonOutput {
				var result map[string]interface{}
				if err := json.Unmarshal(responseByte, &result); err != nil {
					return err
				}
				out, _ := json.MarshalIndent(result, "", "  ")
				fmt.Println(string(out))
			} else {
				fmt.Println("Success")
			}
			return nil
		},
	}

	cmd.Flags().String("chat-id", "", "Target chat ID or @username")
	cmd.Flags().Int64("user-id", 0, "User ID to promote")
	cmd.Flags().Bool("is-anonymous", false, "Admin is anonymous")
	cmd.Flags().Bool("can-manage-chat", false, "Can manage the chat")
	cmd.Flags().Bool("can-delete-messages", false, "Can delete messages")
	cmd.Flags().Bool("can-manage-video-chats", false, "Can manage video chats")
	cmd.Flags().Bool("can-restrict-members", false, "Can restrict members")
	cmd.Flags().Bool("can-promote-members", false, "Can promote members")
	cmd.Flags().Bool("can-change-info", false, "Can change chat info")
	cmd.Flags().Bool("can-invite-users", false, "Can invite users")
	cmd.Flags().Bool("can-post-stories", false, "Can post stories")
	cmd.Flags().Bool("can-edit-stories", false, "Can edit stories")
	cmd.Flags().Bool("can-delete-stories", false, "Can delete stories")
	cmd.Flags().Bool("can-post-messages", false, "Can post messages (channels)")
	cmd.Flags().Bool("can-edit-messages", false, "Can edit messages (channels)")
	cmd.Flags().Bool("can-pin-messages", false, "Can pin messages")
	cmd.Flags().Bool("can-post-story", false, "Can post stories")
	cmd.Flags().Bool("can-manage-topics", false, "Can manage forum topics")

	return cmd
}
