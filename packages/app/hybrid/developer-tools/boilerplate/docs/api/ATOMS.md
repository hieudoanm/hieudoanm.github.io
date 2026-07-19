# Atoms

Small, presentational, dependency-free building blocks.

**256 components** across 16 domains, one file per component in
`src/components/atoms/<domain>/<Name>.tsx`. Every component exports
`export const <Name>: FC<<Name>Props>` with a colocated `interface <Name>Props`;
props are listed verbatim from the interface. `Client` marks components that
start with `'use client';`.

## app

Workspace & productivity.

| Component         | File                            | Props                                                                                                                                          | Client |
| ----------------- | ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| `Clock`           | `atoms/app/Clock.tsx`           | `format?: '12h' \| '24h'; showSeconds?: boolean; className?: string`                                                                           | client |
| `CountUp`         | `atoms/app/CountUp.tsx`         | `end: number; duration?: number; start?: number; prefix?: string; suffix?: string; decimals?: number; className?: string`                      | client |
| `Countdown`       | `atoms/app/Countdown.tsx`       | `value: number; minDigits?: number; className?: string`                                                                                        | —      |
| `GlowCard`        | `atoms/app/GlowCard.tsx`        | `children: ReactNode; color?: GlowColor; title?: string; className?: string`                                                                   | —      |
| `GradientText`    | `atoms/app/GradientText.tsx`    | `children: ReactNode; from?: ThemeColor; to?: ThemeColor; via?: ThemeColor; direction?: GradientDirection; className?: string`                 | —      |
| `Magnetic`        | `atoms/app/Magnetic.tsx`        | `children: ReactNode; strength?: number; className?: string`                                                                                   | client |
| `Progress`        | `atoms/app/Progress.tsx`        | `value: number; max?: number; size?: 'sm' \| 'md' \| 'lg'; variant?: ProgressVariant; label?: string; showValue?: boolean; className?: string` | —      |
| `ProgressRing`    | `atoms/app/ProgressRing.tsx`    | `value: number; size?: number; strokeWidth?: number; showValue?: boolean; className?: string`                                                  | —      |
| `Rating`          | `atoms/app/Rating.tsx`          | `value: number; max?: number; onChange?: (value: number) => void; size?: 'sm' \| 'md' \| 'lg'`                                                 | —      |
| `ScrollProgress`  | `atoms/app/ScrollProgress.tsx`  | `color?: string; className?: string`                                                                                                           | client |
| `Shimmer`         | `atoms/app/Shimmer.tsx`         | `className?: string; rounded?: string`                                                                                                         | —      |
| `Spotlight`       | `atoms/app/Spotlight.tsx`       | `children: ReactNode; className?: string`                                                                                                      | client |
| `StarBorder`      | `atoms/app/StarBorder.tsx`      | `children: ReactNode; from?: ThemeColor; to?: ThemeColor; className?: string`                                                                  | —      |
| `StatusDot`       | `atoms/app/StatusDot.tsx`       | `status: Status; label?: string`                                                                                                               | —      |
| `Swap`            | `atoms/app/Swap.tsx`            | `first: ReactNode; second: ReactNode; on: boolean; onToggle: (next: boolean) => void; ariaLabel?: string`                                      | client |
| `ThemeController` | `atoms/app/ThemeController.tsx` | `theme: string; checked?: boolean; label?: string; onChange?: (checked: boolean, theme: string) => void`                                       | client |

## auth

Auth, security & account.

| Component        | File                            | Props                                                                                                                                                             | Client |
| ---------------- | ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| `Checkbox`       | `atoms/auth/Checkbox.tsx`       | `label: string; checked: boolean; onChange: (checked: boolean) => void; size?: 'sm' \| 'md' \| 'lg'; disabled?: boolean`                                          | —      |
| `CopyButton`     | `atoms/auth/CopyButton.tsx`     | `text: string; label?: string; variant?: 'primary' \| 'secondary' \| 'ghost' \| 'outline'; size?: 'sm' \| 'md' \| 'lg'; onCopy?: () => void`                      | client |
| `FileInput`      | `atoms/auth/FileInput.tsx`      | `label: string; onChange?: (files: FileList \| null) => void; accept?: string; multiple?: boolean; hint?: string`                                                 | —      |
| `Kbd`            | `atoms/auth/Kbd.tsx`            | `children: ReactNode`                                                                                                                                             | —      |
| `Label`          | `atoms/auth/Label.tsx`          | `extends LabelHTMLAttributes<HTMLLabelElement>; children: ReactNode`                                                                                              | —      |
| `NumberField`    | `atoms/auth/NumberField.tsx`    | `label: string; value: number; onChange: (value: number) => void; min?: number; max?: number; step?: number; disabled?: boolean`                                  | client |
| `OTPInput`       | `atoms/auth/OTPInput.tsx`       | `value: string; onChange: (value: string) => void; length?: number; label?: string; disabled?: boolean`                                                           | client |
| `PasswordField`  | `atoms/auth/PasswordField.tsx`  | `label: string; value: string; onChange: (value: string) => void; error?: string; placeholder?: string; disabled?: boolean; autoComplete?: string`                | client |
| `Radio`          | `atoms/auth/Radio.tsx`          | `label: string; name: string; checked: boolean; onChange: (checked: boolean) => void; size?: 'sm' \| 'md' \| 'lg'; disabled?: boolean`                            | —      |
| `Select`         | `atoms/auth/Select.tsx`         | `label: string; value: string; onChange: (value: string) => void; options: SelectOption[]; placeholder?: string; size?: 'sm' \| 'md' \| 'lg'; disabled?: boolean` | —      |
| `Slider`         | `atoms/auth/Slider.tsx`         | `label: string; value: number; onChange: (value: number) => void; min?: number; max?: number; step?: number; showValue?: boolean; disabled?: boolean`             | —      |
| `Switch`         | `atoms/auth/Switch.tsx`         | `label: string; checked: boolean; onChange: (checked: boolean) => void; size?: 'sm' \| 'md' \| 'lg'; disabled?: boolean; description?: string`                    | —      |
| `TextField`      | `atoms/auth/TextField.tsx`      | `extends InputHTMLAttributes<HTMLInputElement>; label: string; error?: string`                                                                                    | —      |
| `Textarea`       | `atoms/auth/Textarea.tsx`       | `extends TextareaHTMLAttributes<HTMLTextAreaElement>; label: string; error?: string`                                                                              | —      |
| `Validator`      | `atoms/auth/Validator.tsx`      | `hint?: string; error?: string; className?: string; children: ReactNode`                                                                                          | client |
| `VisuallyHidden` | `atoms/auth/VisuallyHidden.tsx` | `children: ReactNode; className?: string`                                                                                                                         | —      |

## blog

Blog, course & learning.

| Component      | File                          | Props                                                                                                            | Client |
| -------------- | ----------------------------- | ---------------------------------------------------------------------------------------------------------------- | ------ |
| `ArticleBadge` | `atoms/blog/ArticleBadge.tsx` | `children: ReactNode; variant?: BadgeVariant`                                                                    | —      |
| `AuthorAvatar` | `atoms/blog/AuthorAvatar.tsx` | `name: string; src?: string; size?: AvatarSize`                                                                  | —      |
| `CategoryTag`  | `atoms/blog/CategoryTag.tsx`  | `label: string; href?: string; variant?: BadgeVariant`                                                           | —      |
| `DateStamp`    | `atoms/blog/DateStamp.tsx`    | `date: string`                                                                                                   | —      |
| `ExcerptText`  | `atoms/blog/ExcerptText.tsx`  | `text: string; limit?: number; className?: string`                                                               | —      |
| `HashtagLabel` | `atoms/blog/HashtagLabel.tsx` | `label: string; href?: string; size?: HashtagSize`                                                               | —      |
| `HeadingText`  | `atoms/blog/HeadingText.tsx`  | `children: ReactNode; level?: 1 \| 2 \| 3 \| 4 \| 5 \| 6; className?: string`                                    | —      |
| `KeywordTag`   | `atoms/blog/KeywordTag.tsx`   | `label: string; href?: string`                                                                                   | —      |
| `MetaLabel`    | `atoms/blog/MetaLabel.tsx`    | `children: ReactNode; className?: string`                                                                        | —      |
| `ReadingTime`  | `atoms/blog/ReadingTime.tsx`  | `minutes: number; label?: string`                                                                                | —      |
| `Tag`          | `atoms/blog/Tag.tsx`          | `label: string; variant?: TagVariant; onRemove?: () => void`                                                     | —      |
| `TagCloud`     | `atoms/blog/TagCloud.tsx`     | `tags: TagCloudTag[]; minSize?: number; maxSize?: number; className?: string`                                    | —      |
| `Text`         | `atoms/blog/Text.tsx`         | `as?: TextTag; size?: TextSize; weight?: TextWeight; color?: TextColor; className?: string; children: ReactNode` | —      |
| `TextRotate`   | `atoms/blog/TextRotate.tsx`   | `words: string[]; duration?: number; className?: string`                                                         | —      |
| `TitleText`    | `atoms/blog/TitleText.tsx`    | `children: ReactNode; level?: 1 \| 2 \| 3 \| 4 \| 5 \| 6; className?: string`                                    | —      |
| `WordCount`    | `atoms/blog/WordCount.tsx`    | `text?: string; count?: number; label?: string`                                                                  | —      |

## crm

Sales, CRM & commerce ops.

| Component         | File                            | Props                                                                                                          | Client |
| ----------------- | ------------------------------- | -------------------------------------------------------------------------------------------------------------- | ------ |
| `AccountIcon`     | `atoms/crm/AccountIcon.tsx`     | `name: string; size?: IconSize`                                                                                | —      |
| `BentoGrid`       | `atoms/crm/BentoGrid.tsx`       | `cells: BentoCell[]; className?: string`                                                                       | —      |
| `CompanyIcon`     | `atoms/crm/CompanyIcon.tsx`     | `name: string; src?: string; size?: IconSize`                                                                  | —      |
| `ContactAvatar`   | `atoms/crm/ContactAvatar.tsx`   | `name: string; src?: string; size?: AvatarSize; color?: AvatarColor`                                           | —      |
| `ContactInitials` | `atoms/crm/ContactInitials.tsx` | `name: string; size?: AvatarSize; color?: AvatarColor`                                                         | —      |
| `DealPriority`    | `atoms/crm/DealPriority.tsx`    | `priority: PriorityLevel; label?: string`                                                                      | —      |
| `Indicator`       | `atoms/crm/Indicator.tsx`       | `badge: ReactNode; children: ReactNode; position?: 'top-end' \| 'top-start' \| 'bottom-end' \| 'bottom-start'` | —      |
| `LeadStatus`      | `atoms/crm/LeadStatus.tsx`      | `status: LeadStatusValue`                                                                                      | —      |
| `PhoneIcon`       | `atoms/crm/PhoneIcon.tsx`       | `size?: number; className?: string`                                                                            | —      |
| `PipelineStage`   | `atoms/crm/PipelineStage.tsx`   | `stage: string; index?: number; variant?: BadgeVariant`                                                        | —      |
| `RevenueBadge`    | `atoms/crm/RevenueBadge.tsx`    | `value: number; prefix?: string; variant?: BadgeVariant`                                                       | —      |
| `SalesTrend`      | `atoms/crm/SalesTrend.tsx`      | `value: number; suffix?: string; label?: string`                                                               | —      |
| `StageCount`      | `atoms/crm/StageCount.tsx`      | `count: number; label?: string`                                                                                | —      |
| `TeamAvatar`      | `atoms/crm/TeamAvatar.tsx`      | `name: string; src?: string; size?: AvatarSize; color?: AvatarColor; ring?: boolean`                           | —      |
| `ValueAmount`     | `atoms/crm/ValueAmount.tsx`     | `value: number; currency?: string; decimals?: number; className?: string`                                      | —      |
| `WinRate`         | `atoms/crm/WinRate.tsx`         | `rate: number; label?: string`                                                                                 | —      |

## developer

Developer platform & IoT.

| Component         | File                                  | Props                                                                                                                                             | Client |
| ----------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| `Artboard`        | `atoms/developer/Artboard.tsx`        | `title?: string; size?: ArtboardSize; className?: string; children?: ReactNode`                                                                   | —      |
| `AspectRatio`     | `atoms/developer/AspectRatio.tsx`     | `ratio?: number; className?: string; children?: ReactNode`                                                                                        | —      |
| `Avatar`          | `atoms/developer/Avatar.tsx`          | `src?: string; alt?: string; size?: 'sm' \| 'md' \| 'lg'; fallback?: string`                                                                      | —      |
| `BrowserMockup`   | `atoms/developer/BrowserMockup.tsx`   | `url?: string; className?: string; children?: ReactNode`                                                                                          | —      |
| `CodeBlock`       | `atoms/developer/CodeBlock.tsx`       | `code: string; language?: string; title?: string; showCopy?: boolean`                                                                             | client |
| `Cube`            | `atoms/developer/Cube.tsx`            | `size?: number; speed?: 'slow' \| 'normal' \| 'fast'; className?: string`                                                                         | —      |
| `Dock`            | `atoms/developer/Dock.tsx`            | `items: DockItem[]; label?: string; className?: string`                                                                                           | —      |
| `Hover3D`         | `atoms/developer/Hover3D.tsx`         | `children: ReactNode; className?: string`                                                                                                         | —      |
| `HoverGallery`    | `atoms/developer/HoverGallery.tsx`    | `images: GalleryImage[]; className?: string`                                                                                                      | —      |
| `Icon`            | `atoms/developer/Icon.tsx`            | `name: IconName; size?: 'xs' \| 'sm' \| 'md' \| 'lg'; className?: string`                                                                         | —      |
| `ImageComparison` | `atoms/developer/ImageComparison.tsx` | `before: string; beforeAlt: string; after: string; afterAlt: string; initial?: number; className?: string`                                        | client |
| `LetterAvatar`    | `atoms/developer/LetterAvatar.tsx`    | `name: string; color?: LetterAvatarColor; size?: LetterAvatarSize; className?: string`                                                            | —      |
| `Mask`            | `atoms/developer/Mask.tsx`            | `src: string; alt: string; shape?: \| 'squircle' \| 'heart' \| 'hexagon' \| 'hexagon-2' \| 'decagon' \| 'triangle' \| 'star'; className?: string` | —      |
| `MiniMap`         | `atoms/developer/MiniMap.tsx`         | `sections: MiniMapSection[]; active?: string; className?: string`                                                                                 | —      |
| `PhoneMockup`     | `atoms/developer/PhoneMockup.tsx`     | `camera?: boolean; className?: string; children?: ReactNode`                                                                                      | —      |
| `WindowMockup`    | `atoms/developer/WindowMockup.tsx`    | `title?: string; className?: string; children?: ReactNode`                                                                                        | —      |

## finance

Finance & investing.

| Component         | File                                | Props                                                                                                                     | Client |
| ----------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ------ |
| `AccountBalance`  | `atoms/finance/AccountBalance.tsx`  | `accountName: string; balance: number; currency?: string; variant?: 'default' \| 'credit' \| 'debit'; className?: string` | —      |
| `AmountText`      | `atoms/finance/AmountText.tsx`      | `amount: number; currency?: string; className?: string`                                                                   | —      |
| `BalanceLabel`    | `atoms/finance/BalanceLabel.tsx`    | `label: string; balance: number; currency?: string; className?: string`                                                   | —      |
| `BudgetBar`       | `atoms/finance/BudgetBar.tsx`       | `value: number; max?: number; label?: string; className?: string`                                                         | —      |
| `CashFlow`        | `atoms/finance/CashFlow.tsx`        | `inflow: number; outflow: number; currency?: string; className?: string`                                                  | —      |
| `CurrencyTag`     | `atoms/finance/CurrencyTag.tsx`     | `code: string; amount?: number; className?: string`                                                                       | —      |
| `ExpenseIcon`     | `atoms/finance/ExpenseIcon.tsx`     | `label?: string; size?: 'sm' \| 'md' \| 'lg'; className?: string`                                                         | —      |
| `IncomeIcon`      | `atoms/finance/IncomeIcon.tsx`      | `label?: string; size?: 'sm' \| 'md' \| 'lg'; className?: string`                                                         | —      |
| `InterestRate`    | `atoms/finance/InterestRate.tsx`    | `rate: number; period?: string; className?: string`                                                                       | —      |
| `LimitBadge`      | `atoms/finance/LimitBadge.tsx`      | `limit: number; used?: number; currency?: string; className?: string`                                                     | —      |
| `MonthlyStat`     | `atoms/finance/MonthlyStat.tsx`     | `label: string; value: string \| number; className?: string`                                                              | —      |
| `PaymentStatus`   | `atoms/finance/PaymentStatus.tsx`   | `status: PaymentStatusValue; className?: string`                                                                          | —      |
| `PortfolioValue`  | `atoms/finance/PortfolioValue.tsx`  | `value: number; change: number; currency?: string; className?: string`                                                    | —      |
| `SavingGoal`      | `atoms/finance/SavingGoal.tsx`      | `current: number; target: number; currency?: string; className?: string`                                                  | —      |
| `TransactionType` | `atoms/finance/TransactionType.tsx` | `type: TransactionTypeValue; className?: string`                                                                          | —      |
| `TrendArrow`      | `atoms/finance/TrendArrow.tsx`      | `direction: 'up' \| 'down' \| 'flat'; value?: number; className?: string`                                                 | —      |

## health

Health, fitness & food.

| Component        | File                              | Props                                                                      | Client |
| ---------------- | --------------------------------- | -------------------------------------------------------------------------- | ------ |
| `ActiveMinutes`  | `atoms/health/ActiveMinutes.tsx`  | `minutes: number; goal?: number; className?: string`                       | —      |
| `Badge`          | `atoms/health/Badge.tsx`          | `variant?: BadgeVariant; outline?: boolean; children: ReactNode`           | —      |
| `BloodPressure`  | `atoms/health/BloodPressure.tsx`  | `systolic: number; diastolic: number; unit?: string; className?: string`   | —      |
| `CalorieCount`   | `atoms/health/CalorieCount.tsx`   | `calories: number; goal?: number; className?: string`                      | —      |
| `DistanceValue`  | `atoms/health/DistanceValue.tsx`  | `distance: number; unit?: 'km' \| 'mi'; className?: string`                | —      |
| `HeartRate`      | `atoms/health/HeartRate.tsx`      | `bpm: number; className?: string`                                          | —      |
| `HeightLabel`    | `atoms/health/HeightLabel.tsx`    | `height: number; unit?: 'cm' \| 'in'; className?: string`                  | —      |
| `HydrationLevel` | `atoms/health/HydrationLevel.tsx` | `percent: number; className?: string`                                      | —      |
| `MetricLabel`    | `atoms/health/MetricLabel.tsx`    | `label: string; value: ReactNode; unit?: string; className?: string`       | —      |
| `RestingRate`    | `atoms/health/RestingRate.tsx`    | `bpm: number; className?: string`                                          | —      |
| `SleepHours`     | `atoms/health/SleepHours.tsx`     | `hours: number; goal?: number; className?: string`                         | —      |
| `StepsCount`     | `atoms/health/StepsCount.tsx`     | `steps: number; goal?: number; className?: string`                         | —      |
| `TempValue`      | `atoms/health/TempValue.tsx`      | `value: number; unit?: 'C' \| 'F'; className?: string`                     | —      |
| `WaterIntake`    | `atoms/health/WaterIntake.tsx`    | `amount: number; unit?: 'ml' \| 'cups'; goal?: number; className?: string` | —      |
| `WeightValue`    | `atoms/health/WeightValue.tsx`    | `weight: number; unit?: 'kg' \| 'lb'; className?: string`                  | —      |
| `WorkoutSets`    | `atoms/health/WorkoutSets.tsx`    | `sets: number; reps: number; className?: string`                           | —      |

## hr

HR, people & benefits.

| Component        | File                          | Props                                                                                            | Client |
| ---------------- | ----------------------------- | ------------------------------------------------------------------------------------------------ | ------ |
| `AttendanceDot`  | `atoms/hr/AttendanceDot.tsx`  | `status: 'present' \| 'late' \| 'absent' \| 'leave'; label?: string; size?: 'sm' \| 'md'`        | —      |
| `AwardBadge`     | `atoms/hr/AwardBadge.tsx`     | `label: string; icon?: string; variant?: 'gold' \| 'silver' \| 'bronze'`                         | —      |
| `DepartmentTag`  | `atoms/hr/DepartmentTag.tsx`  | `name: string; className?: string`                                                               | —      |
| `EmployeeAvatar` | `atoms/hr/EmployeeAvatar.tsx` | `name: string; src?: string; size?: 'sm' \| 'md' \| 'lg'`                                        | —      |
| `HireDate`       | `atoms/hr/HireDate.tsx`       | `date: string \| Date; format?: Intl.DateTimeFormatOptions; showIcon?: boolean`                  | —      |
| `JobTitle`       | `atoms/hr/JobTitle.tsx`       | `title: string; className?: string`                                                              | —      |
| `LeaveStatus`    | `atoms/hr/LeaveStatus.tsx`    | `status: 'approved' \| 'pending' \| 'rejected' \| 'cancelled'; label?: string`                   | —      |
| `ManagerName`    | `atoms/hr/ManagerName.tsx`    | `name: string; className?: string`                                                               | —      |
| `OvertimeValue`  | `atoms/hr/OvertimeValue.tsx`  | `hours: number; positive?: boolean`                                                              | —      |
| `PayrollAmount`  | `atoms/hr/PayrollAmount.tsx`  | `amount: number; currency?: string; period?: 'monthly' \| 'yearly' \| 'hourly'; locale?: string` | —      |
| `RoleTag`        | `atoms/hr/RoleTag.tsx`        | `role: string; variant?: 'primary' \| 'secondary' \| 'neutral'`                                  | —      |
| `SkillLevel`     | `atoms/hr/SkillLevel.tsx`     | `skill: string; level: number; max?: number`                                                     | —      |
| `TeamSize`       | `atoms/hr/TeamSize.tsx`       | `count: number; label?: string`                                                                  | —      |
| `TenureLabel`    | `atoms/hr/TenureLabel.tsx`    | `years: number; months?: number`                                                                 | —      |
| `TitleBadge`     | `atoms/hr/TitleBadge.tsx`     | `title: string; variant?: 'primary' \| 'neutral' \| 'ghost'`                                     | —      |
| `WorkHours`      | `atoms/hr/WorkHours.tsx`      | `start: string; end: string; timezone?: string`                                                  | —      |

## landing

Marketing, landing & careers.

| Component          | File                                 | Props                                                                                                                        | Client |
| ------------------ | ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- | ------ |
| `ActionButton`     | `atoms/landing/ActionButton.tsx`     | `label: string; onClick?: () => void; variant?: 'primary' \| 'secondary' \| 'ghost'; disabled?: boolean; className?: string` | client |
| `ArrowLink`        | `atoms/landing/ArrowLink.tsx`        | `label: string; href: string`                                                                                                | —      |
| `BulletPoint`      | `atoms/landing/BulletPoint.tsx`      | `text: string; icon?: string`                                                                                                | —      |
| `CaptionText`      | `atoms/landing/CaptionText.tsx`      | `text: string; className?: string`                                                                                           | —      |
| `CtaButton`        | `atoms/landing/CtaButton.tsx`        | `label: string; onClick?: () => void; variant?: 'primary' \| 'outline'; disabled?: boolean`                                  | client |
| `EmptyPlaceholder` | `atoms/landing/EmptyPlaceholder.tsx` | `icon?: ReactNode; title?: string; description?: string; action?: ReactNode; className?: string`                             | —      |
| `FeatureIcon`      | `atoms/landing/FeatureIcon.tsx`      | `label: string; icon: string; size?: 'sm' \| 'md' \| 'lg'`                                                                   | —      |
| `HeroBadge`        | `atoms/landing/HeroBadge.tsx`        | `text: string; icon?: string`                                                                                                | —      |
| `LogoMark`         | `atoms/landing/LogoMark.tsx`         | `name: string; size?: number`                                                                                                | —      |
| `NavLink`          | `atoms/landing/NavLink.tsx`          | `label: string; href: string; active?: boolean`                                                                              | —      |
| `PricingTag`       | `atoms/landing/PricingTag.tsx`       | `amount: number; period: string; currency?: string`                                                                          | —      |
| `SectionLabel`     | `atoms/landing/SectionLabel.tsx`     | `text: string; className?: string`                                                                                           | —      |
| `StatNumber`       | `atoms/landing/StatNumber.tsx`       | `value: string \| number; label: string`                                                                                     | —      |
| `StepNumber`       | `atoms/landing/StepNumber.tsx`       | `number: number; title: string; description?: string`                                                                        | —      |
| `TestimonialMark`  | `atoms/landing/TestimonialMark.tsx`  | `name: string; quote: string; company?: string`                                                                              | —      |
| `TrustBadge`       | `atoms/landing/TrustBadge.tsx`       | `label: string; icon?: string`                                                                                               | —      |

## mail

Email, inbox & operations.

| Component        | File                            | Props                                                                                                        | Client |
| ---------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------ | ------ |
| `AttachmentIcon` | `atoms/mail/AttachmentIcon.tsx` | `className?: string; size?: number`                                                                          | —      |
| `ComposeIcon`    | `atoms/mail/ComposeIcon.tsx`    | `className?: string; size?: number`                                                                          | —      |
| `EditableText`   | `atoms/mail/EditableText.tsx`   | `value: string; onChange: (value: string) => void; label?: string; placeholder?: string; className?: string` | client |
| `EmailCount`     | `atoms/mail/EmailCount.tsx`     | `count: number; label?: string; className?: string`                                                          | —      |
| `FolderIcon`     | `atoms/mail/FolderIcon.tsx`     | `className?: string; size?: number`                                                                          | —      |
| `InboxBadge`     | `atoms/mail/InboxBadge.tsx`     | `count: number; label?: string; className?: string`                                                          | —      |
| `MailAvatar`     | `atoms/mail/MailAvatar.tsx`     | `name: string; src?: string; size?: 'sm' \| 'md' \| 'lg'; className?: string`                                | —      |
| `PriorityFlag`   | `atoms/mail/PriorityFlag.tsx`   | `priority: 'high' \| 'normal' \| 'low'; className?: string`                                                  | —      |
| `ReadStatus`     | `atoms/mail/ReadStatus.tsx`     | `read: boolean; className?: string`                                                                          | —      |
| `ReplyIcon`      | `atoms/mail/ReplyIcon.tsx`      | `className?: string; size?: number`                                                                          | —      |
| `SenderInitials` | `atoms/mail/SenderInitials.tsx` | `name: string; className?: string`                                                                           | —      |
| `SentIcon`       | `atoms/mail/SentIcon.tsx`       | `className?: string; size?: number`                                                                          | —      |
| `SpamIcon`       | `atoms/mail/SpamIcon.tsx`       | `className?: string; size?: number`                                                                          | —      |
| `StarMail`       | `atoms/mail/StarMail.tsx`       | `starred: boolean; onToggle?: (starred: boolean) => void; className?: string`                                | client |
| `SubjectLabel`   | `atoms/mail/SubjectLabel.tsx`   | `subject: string; unread?: boolean; className?: string`                                                      | —      |
| `TrashIcon`      | `atoms/mail/TrashIcon.tsx`      | `className?: string; size?: number`                                                                          | —      |

## media

Music, streaming & media.

| Component        | File                             | Props                                                                                                        | Client |
| ---------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------ | ------ |
| `AlbumCover`     | `atoms/media/AlbumCover.tsx`     | `title: string; src?: string; size?: 'sm' \| 'md' \| 'lg'; className?: string`                               | —      |
| `ArtistInitials` | `atoms/media/ArtistInitials.tsx` | `name: string; className?: string`                                                                           | —      |
| `Collapse`       | `atoms/media/Collapse.tsx`       | `title: string; children: ReactNode; open?: boolean; onChange?: (open: boolean) => void; className?: string` | client |
| `DurationText`   | `atoms/media/DurationText.tsx`   | `seconds: number; className?: string`                                                                        | —      |
| `EpisodeBadge`   | `atoms/media/EpisodeBadge.tsx`   | `episode: number; label?: string; className?: string`                                                        | —      |
| `GenreTag`       | `atoms/media/GenreTag.tsx`       | `genre: string; className?: string`                                                                          | —      |
| `LikeCount`      | `atoms/media/LikeCount.tsx`      | `count: number; liked?: boolean; className?: string`                                                         | —      |
| `PlayCount`      | `atoms/media/PlayCount.tsx`      | `count: number; label?: string; className?: string`                                                          | —      |
| `PlaylistIcon`   | `atoms/media/PlaylistIcon.tsx`   | `className?: string; size?: number`                                                                          | —      |
| `QueueNumber`    | `atoms/media/QueueNumber.tsx`    | `number: number; className?: string`                                                                         | —      |
| `RatingStar`     | `atoms/media/RatingStar.tsx`     | `rating: number; onChange?: (rating: number) => void; max?: number; className?: string`                      | client |
| `StreamBadge`    | `atoms/media/StreamBadge.tsx`    | `count: number; label?: string; className?: string`                                                          | —      |
| `TrackNumber`    | `atoms/media/TrackNumber.tsx`    | `number: number; className?: string`                                                                         | —      |
| `VideoThumb`     | `atoms/media/VideoThumb.tsx`     | `title: string; src?: string; durationSeconds?: number; className?: string`                                  | —      |
| `VolumeLevel`    | `atoms/media/VolumeLevel.tsx`    | `level: number; className?: string`                                                                          | —      |
| `WatchTime`      | `atoms/media/WatchTime.tsx`      | `minutes: number; className?: string`                                                                        | —      |

## news

News, magazine & sports.

| Component       | File                           | Props                                                                                               | Client |
| --------------- | ------------------------------ | --------------------------------------------------------------------------------------------------- | ------ |
| `ArticleCard`   | `atoms/news/ArticleCard.tsx`   | `title: string; category?: string; author?: string; date?: string; excerpt?: string; href?: string` | —      |
| `BreakingBadge` | `atoms/news/BreakingBadge.tsx` | `label?: string; pulse?: boolean`                                                                   | —      |
| `CategoryChip`  | `atoms/news/CategoryChip.tsx`  | `label: string; active?: boolean; onClick?: () => void`                                             | —      |
| `EditorTag`     | `atoms/news/EditorTag.tsx`     | `name?: string; label?: string`                                                                     | —      |
| `HeadlineText`  | `atoms/news/HeadlineText.tsx`  | `children: string; size?: 'sm' \| 'md' \| 'lg'; className?: string`                                 | —      |
| `ImageCaption`  | `atoms/news/ImageCaption.tsx`  | `children: ReactNode; credit?: string`                                                              | —      |
| `LeadParagraph` | `atoms/news/LeadParagraph.tsx` | `children: ReactNode`                                                                               | —      |
| `MediaBadge`    | `atoms/news/MediaBadge.tsx`    | `type: MediaType`                                                                                   | —      |
| `PublishedDate` | `atoms/news/PublishedDate.tsx` | `date: string \| Date; format?: 'full' \| 'short' \| 'iso'`                                         | —      |
| `ReporterName`  | `atoms/news/ReporterName.tsx`  | `name: string; role?: string`                                                                       | —      |
| `ScoreLabel`    | `atoms/news/ScoreLabel.tsx`    | `score: number; outOf?: number; label?: string`                                                     | —      |
| `StoryKicker`   | `atoms/news/StoryKicker.tsx`   | `children: ReactNode`                                                                               | —      |
| `TagBadge`      | `atoms/news/TagBadge.tsx`      | `label: string; href?: string`                                                                      | —      |
| `TimeAgo`       | `atoms/news/TimeAgo.tsx`       | `date: string \| Date; now?: string \| Date`                                                        | —      |
| `TopStory`      | `atoms/news/TopStory.tsx`      | `label?: string; rank?: number`                                                                     | —      |
| `UpdateBadge`   | `atoms/news/UpdateBadge.tsx`   | `label?: string; time?: string`                                                                     | —      |

## social

Social, community & gaming.

| Component       | File                             | Props                                                                                                   | Client |
| --------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------- | ------ |
| `CommentCount`  | `atoms/social/CommentCount.tsx`  | `count: number; label?: string`                                                                         | —      |
| `ConnectionDot` | `atoms/social/ConnectionDot.tsx` | `status: ConnectionStatus; size?: 'sm' \| 'md' \| 'lg'`                                                 | —      |
| `FollowButton`  | `atoms/social/FollowButton.tsx`  | `following?: boolean; label?: string; followingLabel?: string; onToggle?: (following: boolean) => void` | client |
| `FollowerCount` | `atoms/social/FollowerCount.tsx` | `count: number; label?: string`                                                                         | —      |
| `FriendAvatar`  | `atoms/social/FriendAvatar.tsx`  | `name: string; src?: string; size?: 'sm' \| 'md' \| 'lg'`                                               | —      |
| `GroupIcon`     | `atoms/social/GroupIcon.tsx`     | `type?: GroupType`                                                                                      | —      |
| `LikeButton`    | `atoms/social/LikeButton.tsx`    | `liked?: boolean; count?: number; onToggle?: (liked: boolean) => void; ariaLabel?: string`              | client |
| `MentionTag`    | `atoms/social/MentionTag.tsx`    | `name: string; href?: string`                                                                           | —      |
| `MessageIcon`   | `atoms/social/MessageIcon.tsx`   | `unread?: boolean; label?: string; onClick?: () => void`                                                | —      |
| `OnlineBadge`   | `atoms/social/OnlineBadge.tsx`   | `label?: string; name?: string`                                                                         | —      |
| `PostIcon`      | `atoms/social/PostIcon.tsx`      | `type: PostType`                                                                                        | —      |
| `ProfileBadge`  | `atoms/social/ProfileBadge.tsx`  | `name: string; src?: string; verified?: boolean; role?: string`                                         | —      |
| `ShareIcon`     | `atoms/social/ShareIcon.tsx`     | `label?: string; onClick?: () => void`                                                                  | —      |
| `StoryRing`     | `atoms/social/StoryRing.tsx`     | `name: string; src?: string; viewed?: boolean`                                                          | —      |
| `UnreadBadge`   | `atoms/social/UnreadBadge.tsx`   | `count: number; label?: string`                                                                         | —      |
| `UsernameLabel` | `atoms/social/UsernameLabel.tsx` | `username: string; verified?: boolean; displayName?: string`                                            | —      |

## store

Storefront & e-commerce.

| Component         | File                              | Props                                                                                                                          | Client |
| ----------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ------ |
| `CartBadge`       | `atoms/store/CartBadge.tsx`       | `count: number; label?: string`                                                                                                | —      |
| `CategoryIcon`    | `atoms/store/CategoryIcon.tsx`    | `label: string; size?: number`                                                                                                 | —      |
| `CompareIcon`     | `atoms/store/CompareIcon.tsx`     | `size?: number; label?: string`                                                                                                | —      |
| `DiscountTag`     | `atoms/store/DiscountTag.tsx`     | `discount: number; variant?: 'error' \| 'success' \| 'warning' \| 'accent'`                                                    | —      |
| `FavoriteHeart`   | `atoms/store/FavoriteHeart.tsx`   | `active?: boolean; size?: number; label?: string; onChange?: (active: boolean) => void`                                        | client |
| `FreeShipping`    | `atoms/store/FreeShipping.tsx`    | `label?: string`                                                                                                               | —      |
| `GiftIcon`        | `atoms/store/GiftIcon.tsx`        | `size?: number; label?: string`                                                                                                | —      |
| `PriceLabel`      | `atoms/store/PriceLabel.tsx`      | `amount: number; currency?: string; strikethrough?: boolean`                                                                   | —      |
| `ProductBadge`    | `atoms/store/ProductBadge.tsx`    | `label: string; variant?: \| 'primary' \| 'secondary' \| 'accent' \| 'neutral' \| 'info' \| 'success' \| 'warning' \| 'error'` | —      |
| `QuantityStepper` | `atoms/store/QuantityStepper.tsx` | `value: number; onChange: (next: number) => void; min?: number; max?: number; step?: number; label?: string`                   | client |
| `RatingCount`     | `atoms/store/RatingCount.tsx`     | `rating: number; count: number`                                                                                                | —      |
| `ReviewCount`     | `atoms/store/ReviewCount.tsx`     | `count: number`                                                                                                                | —      |
| `StockStatus`     | `atoms/store/StockStatus.tsx`     | `status: 'in' \| 'low' \| 'out'; count?: number`                                                                               | —      |
| `StoreLogo`       | `atoms/store/StoreLogo.tsx`       | `name: string; src?: string; size?: number`                                                                                    | —      |
| `UnitPrice`       | `atoms/store/UnitPrice.tsx`       | `amount: number; currency?: string; per?: string`                                                                              | —      |
| `WishlistIcon`    | `atoms/store/WishlistIcon.tsx`    | `active?: boolean; size?: number; label?: string; onChange?: (active: boolean) => void`                                        | client |

## support

Support, knowledge & system.

| Component    | File                           | Props                                                                                                                                                                                                | Client |
| ------------ | ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| `Button`     | `atoms/support/Button.tsx`     | `variant?: ButtonVariant; size?: 'sm' \| 'md' \| 'lg'; loading?: boolean; disabled?: boolean; onClick?: () => void; type?: 'button' \| 'submit' \| 'reset'; className?: string; children: ReactNode` | —      |
| `ButtonLink` | `atoms/support/ButtonLink.tsx` | `href: string; children: ReactNode; variant?: 'primary' \| 'secondary' \| 'accent' \| 'ghost' \| 'outline' \| 'link'; size?: 'sm' \| 'md' \| 'lg'; className?: string`                               | —      |
| `Container`  | `atoms/support/Container.tsx`  | `size?: ContainerSize; className?: string; children: ReactNode`                                                                                                                                      | —      |
| `Divider`    | `atoms/support/Divider.tsx`    | `label?: string; className?: string`                                                                                                                                                                 | —      |
| `Grid`       | `atoms/support/Grid.tsx`       | `cols?: GridCols; smCols?: GridCols; lgCols?: GridCols; gap?: GridGap; className?: string; children: ReactNode`                                                                                      | —      |
| `Glow`       | `atoms/support/Glow.tsx`       | `children: ReactNode; color?: GlowColor; size?: 'sm' \| 'md' \| 'lg'; className?: string`                                                                                                            | —      |
| `IconButton` | `atoms/support/IconButton.tsx` | `icon: ReactNode; label: string; onClick?: () => void; variant?: 'primary' \| 'secondary' \| 'ghost' \| 'outline' \| 'link'; size?: 'sm' \| 'md' \| 'lg'; disabled?: boolean`                        | —      |
| `LinkButton` | `atoms/support/LinkButton.tsx` | `href: string; children: ReactNode; variant?: 'primary' \| 'secondary' \| 'accent' \| 'ghost' \| 'outline' \| 'link'; size?: 'sm' \| 'md' \| 'lg'; className?: string`                               | —      |
| `Loading`    | `atoms/support/Loading.tsx`    | `variant?: LoadingVariant; size?: LoadingSize; className?: string`                                                                                                                                   | —      |
| `Separator`  | `atoms/support/Separator.tsx`  | `className?: string`                                                                                                                                                                                 | —      |
| `Skeleton`   | `atoms/support/Skeleton.tsx`   | `className?: string`                                                                                                                                                                                 | —      |
| `Slot`       | `atoms/support/Slot.tsx`       | `className?: string; onClick?: (event: MouseEvent) => void; children: ReactElement<{ className?: string; onClick?: (event: MouseEvent) => void; }>`                                                  | client |
| `Spacer`     | `atoms/support/Spacer.tsx`     | `axis?: 'horizontal' \| 'vertical'; size?: number; className?: string`                                                                                                                               | —      |
| `Spinner`    | `atoms/support/Spinner.tsx`    | `size?: 'sm' \| 'md' \| 'lg'`                                                                                                                                                                        | —      |
| `Stack`      | `atoms/support/Stack.tsx`      | `items: ReactNode[]; direction?: 'vertical' \| 'horizontal'; className?: string`                                                                                                                     | —      |
| `Tooltip`    | `atoms/support/Tooltip.tsx`    | `content: string; children: ReactNode; position?: 'top' \| 'bottom' \| 'left' \| 'right'`                                                                                                            | —      |

## travel

Travel, real estate & property.

| Component        | File                              | Props                                                                                 | Client |
| ---------------- | --------------------------------- | ------------------------------------------------------------------------------------- | ------ |
| `ArrivalIcon`    | `atoms/travel/ArrivalIcon.tsx`    | `size?: number; label?: string`                                                       | —      |
| `DepartureIcon`  | `atoms/travel/DepartureIcon.tsx`  | `size?: number; label?: string`                                                       | —      |
| `DestinationTag` | `atoms/travel/DestinationTag.tsx` | `name: string; city?: string`                                                         | —      |
| `DistanceLabel`  | `atoms/travel/DistanceLabel.tsx`  | `value: number; unit?: string`                                                        | —      |
| `FlightBadge`    | `atoms/travel/FlightBadge.tsx`    | `code: string; status?: 'on-time' \| 'delayed' \| 'boarding' \| 'cancelled'`          | —      |
| `GuestCount`     | `atoms/travel/GuestCount.tsx`     | `count: number`                                                                       | —      |
| `HotelStar`      | `atoms/travel/HotelStar.tsx`      | `value: number; max?: number`                                                         | —      |
| `MapMarker`      | `atoms/travel/MapMarker.tsx`      | `size?: number; label?: string`                                                       | —      |
| `NightCount`     | `atoms/travel/NightCount.tsx`     | `count: number`                                                                       | —      |
| `PricePerNight`  | `atoms/travel/PricePerNight.tsx`  | `amount: number; currency?: string`                                                   | —      |
| `RatingLabel`    | `atoms/travel/RatingLabel.tsx`    | `score: number; label?: string`                                                       | —      |
| `RoomType`       | `atoms/travel/RoomType.tsx`       | `label: string`                                                                       | —      |
| `SeatIcon`       | `atoms/travel/SeatIcon.tsx`       | `size?: number; label?: string`                                                       | —      |
| `TimeZone`       | `atoms/travel/TimeZone.tsx`       | `timezone: string; city?: string`                                                     | —      |
| `TravelIcon`     | `atoms/travel/TravelIcon.tsx`     | `size?: number; label?: string`                                                       | —      |
| `WeatherIcon`    | `atoms/travel/WeatherIcon.tsx`    | `condition: 'sunny' \| 'cloudy' \| 'rain' \| 'snow' \| 'storm'; temperature?: number` | —      |

---

[Back to index](README.md)
