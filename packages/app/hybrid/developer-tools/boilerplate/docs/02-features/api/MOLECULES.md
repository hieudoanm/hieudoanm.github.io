# Molecules

Combinations of two or more atoms that form a single, reusable unit.

**256 components** across 16 domains, one file per component in
`src/components/molecules/<domain>/<Name>.tsx`. Every component exports
`export const <Name>: FC<<Name>Props>` with a colocated `interface <Name>Props`;
props are listed verbatim from the interface. `Client` marks components that
start with `'use client';`.

## app

Workspace & productivity.

| Component       | File                              | Props                                                                                                                                                                                                              | Client |
| --------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------ |
| `ButtonGroup`   | `molecules/app/ButtonGroup.tsx`   | `options: ButtonGroupOption[]; value: string; onChange: (value: string) => void; orientation?: 'horizontal' \| 'vertical'; size?: 'sm' \| 'md' \| 'lg'; disabled?: boolean`                                        | client |
| `CheckboxGroup` | `molecules/app/CheckboxGroup.tsx` | `options: CheckboxOption[]; value: string[]; onChange: (value: string[]) => void; label?: string; error?: string; disabled?: boolean; inline?: boolean`                                                            | —      |
| `Combobox`      | `molecules/app/Combobox.tsx`      | `options: ComboboxOption[]; value: string; onChange: (value: string) => void; label?: string; placeholder?: string; emptyText?: string; disabled?: boolean`                                                        | client |
| `Fieldset`      | `molecules/app/Fieldset.tsx`      | `legend: string; description?: string; disabled?: boolean; className?: string; children: ReactNode`                                                                                                                | —      |
| `FilterGroup`   | `molecules/app/FilterGroup.tsx`   | `name: string; options: FilterOption[]; selected: string[]; onChange: (next: string[]) => void`                                                                                                                    | client |
| `FormRow`       | `molecules/app/FormRow.tsx`       | `label: string; htmlFor?: string; hint?: string; error?: string; required?: boolean; children: ReactNode`                                                                                                          | —      |
| `Gauge`         | `molecules/app/Gauge.tsx`         | `value: number; max?: number; size?: number; thickness?: number; label?: string; showValue?: boolean; variant?: GaugeVariant; className?: string`                                                                  | —      |
| `InputGroup`    | `molecules/app/InputGroup.tsx`    | `value: string; onChange: (value: string) => void; label?: string; leading?: ReactNode; trailing?: ReactNode; placeholder?: string; type?: string; error?: string; hint?: string; disabled?: boolean; id?: string` | —      |
| `InputStepper`  | `molecules/app/InputStepper.tsx`  | `label: string; options: string[]; value: string; onChange: (value: string) => void`                                                                                                                               | client |
| `MultiSelect`   | `molecules/app/MultiSelect.tsx`   | `options: MultiSelectOption[]; value: string[]; onChange: (next: string[]) => void; label?: string; placeholder?: string`                                                                                          | client |
| `NumberInput`   | `molecules/app/NumberInput.tsx`   | `label: string; value: number; onChange: (value: number) => void; min?: number; max?: number; step?: number; placeholder?: string; error?: string; hint?: string; disabled?: boolean`                              | —      |
| `RadioGroup`    | `molecules/app/RadioGroup.tsx`    | `name: string; options: RadioOption[]; value: string; onChange: (value: string) => void; label?: string; error?: string; disabled?: boolean; inline?: boolean`                                                     | —      |
| `Stat`          | `molecules/app/Stat.tsx`          | `label: string; value: string; icon?: ReactNode; description?: string; variant?: 'primary' \| 'secondary' \| 'accent' \| 'success' \| 'warning' \| 'error'`                                                        | —      |
| `StatTrend`     | `molecules/app/StatTrend.tsx`     | `label: string; value: string; trend?: number; icon?: ReactNode; className?: string`                                                                                                                               | —      |
| `TagInput`      | `molecules/app/TagInput.tsx`      | `tags: string[]; onChange: (tags: string[]) => void; placeholder?: string; disabled?: boolean`                                                                                                                     | client |
| `ToggleGroup`   | `molecules/app/ToggleGroup.tsx`   | `options: ToggleOption[]; value: string[] \| string; onChange: (value: string[] \| string) => void; multiple?: boolean; disabled?: boolean; className?: string`                                                    | —      |

## auth

Auth, security & account.

| Component          | File                                  | Props                                                                                                                                                                                                               | Client |
| ------------------ | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| `Alert`            | `molecules/auth/Alert.tsx`            | `variant?: AlertVariant; title?: string; description?: ReactNode; dismissible?: boolean; onClose?: () => void; className?: string; children?: ReactNode`                                                            | —      |
| `AvatarGroup`      | `molecules/auth/AvatarGroup.tsx`      | `avatars: GroupAvatar[]; size?: 'sm' \| 'md' \| 'lg'; max?: number`                                                                                                                                                 | —      |
| `Banner`           | `molecules/auth/Banner.tsx`           | `title?: string; description?: ReactNode; variant?: BannerVariant; icon?: ReactNode; action?: ReactNode; dismissible?: boolean; onClose?: () => void; className?: string; children?: ReactNode`                     | —      |
| `Checklist`        | `molecules/auth/Checklist.tsx`        | `items: ChecklistItem[]; onToggle: (id: string) => void; className?: string`                                                                                                                                        | —      |
| `Chip`             | `molecules/auth/Chip.tsx`             | `label: string; color?: ChipColor; variant?: 'filled' \| 'outline'; size?: 'sm' \| 'md'; icon?: ReactNode; avatar?: ReactNode; onClick?: () => void; onDelete?: () => void; disabled?: boolean; className?: string` | —      |
| `ConfirmDialog`    | `molecules/auth/ConfirmDialog.tsx`    | `open: boolean; title: string; message?: string; confirmLabel?: string; cancelLabel?: string; danger?: boolean; loading?: boolean; onConfirm: () => void; onCancel?: () => void`                                    | —      |
| `ContextMenu`      | `molecules/auth/ContextMenu.tsx`      | `trigger: ReactNode; items: ContextMenuItem[]`                                                                                                                                                                      | —      |
| `DangerZone`       | `molecules/auth/DangerZone.tsx`       | `items: DangerZoneItem[]; title?: string`                                                                                                                                                                           | —      |
| `Dropdown`         | `molecules/auth/Dropdown.tsx`         | `trigger: ReactNode; items: DropdownItem[]`                                                                                                                                                                         | client |
| `FeatureList`      | `molecules/auth/FeatureList.tsx`      | `items: FeatureListFeature[]; columns?: 1 \| 2; className?: string`                                                                                                                                                 | —      |
| `InfoList`         | `molecules/auth/InfoList.tsx`         | `items: InfoListItem[]; title?: string; columns?: 1 \| 2`                                                                                                                                                           | —      |
| `InlineAlert`      | `molecules/auth/InlineAlert.tsx`      | `variant?: 'info' \| 'success' \| 'warning' \| 'error'; children: ReactNode; onClose?: () => void`                                                                                                                  | —      |
| `KeyValue`         | `molecules/auth/KeyValue.tsx`         | `items: KeyValueItem[]; title?: string`                                                                                                                                                                             | —      |
| `Menu`             | `molecules/auth/Menu.tsx`             | `items: MenuItem[]; title?: string`                                                                                                                                                                                 | —      |
| `Menubar`          | `molecules/auth/Menubar.tsx`          | `items: MenubarItem[]; ariaLabel?: string`                                                                                                                                                                          | client |
| `PasswordStrength` | `molecules/auth/PasswordStrength.tsx` | `value: string; label?: string`                                                                                                                                                                                     | —      |

## blog

Blog, course & learning.

| Component       | File                               | Props                                                                                                                                                                      | Client |
| --------------- | ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| `ArticleCard`   | `molecules/blog/ArticleCard.tsx`   | `title: string; excerpt: string; author: string; readTime: string; date?: string; category?: string; imageSrc?: string; href?: string`                                     | —      |
| `AuthorBio`     | `molecules/blog/AuthorBio.tsx`     | `name: string; bio: string; avatar?: string; role?: string; socials?: { label: string; href: string }[]`                                                                   | —      |
| `CategoryList`  | `molecules/blog/CategoryList.tsx`  | `categories: CategoryItem[]; active?: string; onSelect?: (label: string) => void`                                                                                          | client |
| `ChatBubble`    | `molecules/blog/ChatBubble.tsx`    | `message: string; sender: 'user' \| 'assistant'; name?: string; time?: string; avatar?: ReactNode`                                                                         | —      |
| `CommentBox`    | `molecules/blog/CommentBox.tsx`    | `onSubmit: (text: string) => void; placeholder?: string; submitLabel?: string; author?: string`                                                                            | client |
| `FeaturedPost`  | `molecules/blog/FeaturedPost.tsx`  | `title: string; excerpt: string; author: string; readTime: string; imageSrc?: string; href?: string; category?: string`                                                    | —      |
| `PostHeader`    | `molecules/blog/PostHeader.tsx`    | `title: string; author: string; date: string; readTime: string; category?: string`                                                                                         | —      |
| `QuoteBlock`    | `molecules/blog/QuoteBlock.tsx`    | `quote: string; author?: string; source?: string`                                                                                                                          | —      |
| `RelatedPosts`  | `molecules/blog/RelatedPosts.tsx`  | `title?: string; posts: RelatedPost[]`                                                                                                                                     | —      |
| `ReviewCard`    | `molecules/blog/ReviewCard.tsx`    | `quote: string; author: string; role?: string; rating?: number; initials?: string; className?: string`                                                                     | —      |
| `ShareButtons`  | `molecules/blog/ShareButtons.tsx`  | `url: string; title?: string; onShare?: (network: string) => void`                                                                                                         | client |
| `SkillBar`      | `molecules/blog/SkillBar.tsx`      | `label: string; value: number; max?: number; variant?: 'primary' \| 'secondary' \| 'accent' \| 'success' \| 'warning' \| 'error'; showValue?: boolean; className?: string` | —      |
| `SocialLinks`   | `molecules/blog/SocialLinks.tsx`   | `items: SocialLinkItem[]; size?: 'sm' \| 'md' \| 'lg'; className?: string`                                                                                                 | —      |
| `SubscribeForm` | `molecules/blog/SubscribeForm.tsx` | `onSubmit: (email: string) => void; title?: string; description?: string; buttonLabel?: string`                                                                            | client |
| `TagChips`      | `molecules/blog/TagChips.tsx`      | `tags: string[]; title?: string`                                                                                                                                           | —      |

## crm

Sales, CRM & commerce ops.

| Component            | File                                   | Props                                                                                                                                     | Client |
| -------------------- | -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| `ActivityLog`        | `molecules/crm/ActivityLog.tsx`        | `activities: Activity[]`                                                                                                                  | —      |
| `ContactCard`        | `molecules/crm/ContactCard.tsx`        | `name: string; email: string; title?: string; company?: string; phone?: string; avatar?: string; status?: string`                         | —      |
| `CustomerSegment`    | `molecules/crm/CustomerSegment.tsx`    | `name: string; count: number; description?: string; color?: string; avgOrderValue?: number; currency?: string`                            | —      |
| `CustomerTable`      | `molecules/crm/CustomerTable.tsx`      | `rows: CustomerRow[]`                                                                                                                     | —      |
| `DealCard`           | `molecules/crm/DealCard.tsx`           | `name: string; company: string; amount: number; stage?: string; probability?: number; owner?: string; currency?: string`                  | —      |
| `FollowUpTask`       | `molecules/crm/FollowUpTask.tsx`       | `id: string; title: string; dueDate: string; owner: string; completed?: boolean; onChange?: (id: string, completed: boolean) => void`     | client |
| `InventoryTable`     | `molecules/crm/InventoryTable.tsx`     | `rows: InventoryRow[]`                                                                                                                    | —      |
| `InvoiceCard`        | `molecules/crm/InvoiceCard.tsx`        | `id: string; customer: string; items: InvoiceItem[]; status: 'Pending' \| 'Paid' \| 'Overdue'; currency?: string`                         | —      |
| `LeadCard`           | `molecules/crm/LeadCard.tsx`           | `name: string; company?: string; email?: string; source?: string; score?: number; status?: 'New' \| 'Contacted' \| 'Qualified' \| 'Lost'` | —      |
| `OrderCard`          | `molecules/crm/OrderCard.tsx`          | `id: string; customer: string; date: string; total: number; itemsCount: number; status: string; currency?: string`                        | —      |
| `PipelineView`       | `molecules/crm/PipelineView.tsx`       | `stages: PipelineStage[]`                                                                                                                 | —      |
| `ProductCatalogCard` | `molecules/crm/ProductCatalogCard.tsx` | `name: string; price: number; sku: string; category?: string; stock?: number; imageSrc?: string; currency?: string`                       | —      |
| `SalesFunnel`        | `molecules/crm/SalesFunnel.tsx`        | `stages: FunnelStage[]`                                                                                                                   | —      |
| `StatsRow`           | `molecules/crm/StatsRow.tsx`           | `stats: StatValue[]`                                                                                                                      | —      |
| `SupportTicket`      | `molecules/crm/SupportTicket.tsx`      | `id: string; subject: string; customer: string; priority: 'Low' \| 'Medium' \| 'High'; status: string; date: string`                      | —      |
| `TeamCard`           | `molecules/crm/TeamCard.tsx`           | `name: string; members: TeamMember[]; totalQuota?: number; currency?: string`                                                             | —      |

## developer

Developer platform & IoT.

| Component      | File                                   | Props                                                                                                                                                          | Client |
| -------------- | -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| `Carousel`     | `molecules/developer/Carousel.tsx`     | `slides: ReactNode[]; ariaLabel?: string`                                                                                                                      | client |
| `ColorPicker`  | `molecules/developer/ColorPicker.tsx`  | `value: string; onChange: (value: string) => void; label?: string; swatches?: string[]; disabled?: boolean`                                                    | client |
| `DatePicker`   | `molecules/developer/DatePicker.tsx`   | `value?: Date; onChange: (date: Date) => void; label?: string; placeholder?: string; minDate?: Date; maxDate?: Date`                                           | client |
| `DateRange`    | `molecules/developer/DateRange.tsx`    | `start: string; end: string; onStartChange: (value: string) => void; onEndChange: (value: string) => void; label?: string; min?: string; max?: string`         | —      |
| `EmptyState`   | `molecules/developer/EmptyState.tsx`   | `icon: ReactNode; title: string; description?: string; action?: ReactNode`                                                                                     | —      |
| `FileUpload`   | `molecules/developer/FileUpload.tsx`   | `label?: string; accept?: string; multiple?: boolean; maxSize?: number; onFilesChange?: (files: UploadedFile[]) => void; hint?: string`                        | client |
| `HoverCard`    | `molecules/developer/HoverCard.tsx`    | `trigger: ReactNode; content: ReactNode; side?: HoverCardSide; widthClass?: string; className?: string`                                                        | —      |
| `ImageGallery` | `molecules/developer/ImageGallery.tsx` | `images: GalleryImage[]; label?: string`                                                                                                                       | client |
| `JsonViewer`   | `molecules/developer/JsonViewer.tsx`   | `data: unknown; name?: string; defaultExpanded?: boolean; className?: string`                                                                                  | client |
| `Pagination`   | `molecules/developer/Pagination.tsx`   | `current: number; total: number; onChange: (page: number) => void; siblingCount?: number`                                                                      | —      |
| `Resizable`    | `molecules/developer/Resizable.tsx`    | `direction?: 'horizontal' \| 'vertical'; initialRatio?: number; minRatio?: number; maxRatio?: number; first: ReactNode; second: ReactNode; className?: string` | client |
| `SearchBar`    | `molecules/developer/SearchBar.tsx`    | `value: string; onChange: (value: string) => void; placeholder?: string; size?: 'sm' \| 'md' \| 'lg'; disabled?: boolean`                                      | client |
| `SpeedDial`    | `molecules/developer/SpeedDial.tsx`    | `triggerIcon: ReactNode; actions: SpeedDialAction[]; position?: SpeedDialPosition; openLabel?: string; closeLabel?: string`                                    | client |
| `TimePicker`   | `molecules/developer/TimePicker.tsx`   | `value: string; onChange: (time: string) => void; label?: string; stepMinutes?: number; format?: '12h' \| '24h'`                                               | client |
| `TransferList` | `molecules/developer/TransferList.tsx` | `left: TransferItem[]; right: TransferItem[]; onChange: (left: TransferItem[], right: TransferItem[]) => void; leftTitle?: string; rightTitle?: string`        | client |
| `TreeView`     | `molecules/developer/TreeView.tsx`     | `nodes: TreeNode[]`                                                                                                                                            | client |

## finance

Finance & investing.

| Component          | File                                     | Props                                                                                                                                    | Client |
| ------------------ | ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| `AccountSummary`   | `molecules/finance/AccountSummary.tsx`   | `accounts: Account[]; currency?: string; showTotal?: boolean`                                                                            | —      |
| `AlertsCard`       | `molecules/finance/AlertsCard.tsx`       | `alerts: AlertItem[]; title?: string`                                                                                                    | —      |
| `BalanceCard`      | `molecules/finance/BalanceCard.tsx`      | `title?: string; label?: string; balance: number; currency?: string; trend?: number`                                                     | —      |
| `BudgetCard`       | `molecules/finance/BudgetCard.tsx`       | `name: string; spent: number; limit: number; currency?: string`                                                                          | —      |
| `ExchangeCard`     | `molecules/finance/ExchangeCard.tsx`     | `from: string; to: string; amount: number; rate: number; converted?: number; onSwap?: () => void`                                        | —      |
| `ExpenseList`      | `molecules/finance/ExpenseList.tsx`      | `expenses: ExpenseItem[]; currency?: string; limit?: number`                                                                             | —      |
| `IncomeList`       | `molecules/finance/IncomeList.tsx`       | `incomes: IncomeItem[]; currency?: string; limit?: number`                                                                               | —      |
| `InvoiceRow`       | `molecules/finance/InvoiceRow.tsx`       | `id: string; customer: string; amount: number; date: string; status?: InvoiceStatus; currency?: string; onSelect?: (id: string) => void` | —      |
| `LoanCard`         | `molecules/finance/LoanCard.tsx`         | `lender: string; principal: number; balance: number; rate: number; term?: string; nextPayment?: string; currency?: string`               | —      |
| `PaymentCard`      | `molecules/finance/PaymentCard.tsx`      | `provider: string; last4: string; holder?: string; expiry?: string; primary?: boolean`                                                   | —      |
| `PortfolioCard`    | `molecules/finance/PortfolioCard.tsx`    | `title?: string; totalValue: number; change?: number; holdings: Holding[]; currency?: string`                                            | —      |
| `SavingsGoal`      | `molecules/finance/SavingsGoal.tsx`      | `name: string; current: number; target: number; currency?: string; deadline?: string`                                                    | —      |
| `StockChart`       | `molecules/finance/StockChart.tsx`       | `points: StockPoint[]; title?: string`                                                                                                   | —      |
| `TaxCard`          | `molecules/finance/TaxCard.tsx`          | `title: string; amount: number; dueDate: string; status?: TaxStatus; currency?: string`                                                  | —      |
| `TransactionTable` | `molecules/finance/TransactionTable.tsx` | `transactions: Transaction[]; currency?: string`                                                                                         | —      |
| `WatchlistRow`     | `molecules/finance/WatchlistRow.tsx`     | `symbol: string; name: string; price: number; change: number; currency?: string; onSelect?: (symbol: string) => void`                    | —      |

## health

Health, fitness & food.

| Component         | File                                   | Props                                                                                                                                 | Client |
| ----------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| `ActivityGoal`    | `molecules/health/ActivityGoal.tsx`    | `label: string; current: number; target: number; unit?: string; completed?: boolean; onAdd?: (delta: number) => void`                 | —      |
| `AppointmentCard` | `molecules/health/AppointmentCard.tsx` | `doctor: string; specialty: string; date: string; time: string; location?: string; status?: AppointmentStatus; onCancel?: () => void` | —      |
| `CalorieTracker`  | `molecules/health/CalorieTracker.tsx`  | `consumed: number; burned: number; goal: number`                                                                                      | —      |
| `DoctorCard`      | `molecules/health/DoctorCard.tsx`      | `name: string; specialty: string; rating: number; reviews?: number; availability?: string; onBook?: () => void`                       | —      |
| `HealthTip`       | `molecules/health/HealthTip.tsx`       | `tip: string; category?: string; source?: string`                                                                                     | —      |
| `HeartRateChart`  | `molecules/health/HeartRateChart.tsx`  | `points: HeartRatePoint[]; title?: string`                                                                                            | —      |
| `MealPlan`        | `molecules/health/MealPlan.tsx`        | `meals: Meal[]; title?: string`                                                                                                       | —      |
| `MedicationCard`  | `molecules/health/MedicationCard.tsx`  | `name: string; dose: string; time: string; frequency?: string; taken?: boolean; onToggle?: (taken: boolean) => void`                  | client |
| `NutritionCard`   | `molecules/health/NutritionCard.tsx`   | `calories: Nutrient; protein: Nutrient; carbs: Nutrient; fat: Nutrient`                                                               | —      |
| `SleepChart`      | `molecules/health/SleepChart.tsx`      | `points: SleepPoint[]; title?: string`                                                                                                | —      |
| `StepsChart`      | `molecules/health/StepsChart.tsx`      | `points: StepsPoint[]; goal?: number`                                                                                                 | —      |
| `SymptomCard`     | `molecules/health/SymptomCard.tsx`     | `name: string; severity: Severity; duration?: string; note?: string; date?: string`                                                   | —      |
| `VitalsCard`      | `molecules/health/VitalsCard.tsx`      | `bloodPressure: string; heartRate: number; temperature: number; spo2: number; title?: string`                                         | —      |
| `WaterTracker`    | `molecules/health/WaterTracker.tsx`    | `glasses: number; target: number; onAdd?: (glasses: number) => void; onRemove?: (glasses: number) => void`                            | client |
| `WeightChart`     | `molecules/health/WeightChart.tsx`     | `points: WeightPoint[]; unit?: string`                                                                                                | —      |
| `WorkoutCard`     | `molecules/health/WorkoutCard.tsx`     | `name: string; duration: number; calories: number; type?: string; intensity?: Intensity; date?: string; completed?: boolean`          | —      |

## hr

HR, people & benefits.

| Component         | File                               | Props                                                                                                                                                                                                           | Client |
| ----------------- | ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| `AttendanceTable` | `molecules/hr/AttendanceTable.tsx` | `rows: AttendanceRow[]; className?: string`                                                                                                                                                                     | —      |
| `BenefitCard`     | `molecules/hr/BenefitCard.tsx`     | `title: string; description: string; category?: string; icon?: string; className?: string`                                                                                                                      | —      |
| `CandidateCard`   | `molecules/hr/CandidateCard.tsx`   | `name: string; position: string; stage: string; score?: number; appliedAt?: string; location?: string; className?: string`                                                                                      | —      |
| `EmployeeCard`    | `molecules/hr/EmployeeCard.tsx`    | `employee: Employee; className?: string`                                                                                                                                                                        | —      |
| `InterviewCard`   | `molecules/hr/InterviewCard.tsx`   | `candidate: string; role: string; interviewer?: string; date: string; time: string; type: 'onsite' \| 'phone' \| 'video' \| 'technical'; status: 'scheduled' \| 'completed' \| 'cancelled'; className?: string` | —      |
| `JobPosting`      | `molecules/hr/JobPosting.tsx`      | `title: string; department: string; location: string; type: string; salary?: string; postedAt?: string; deadline?: string; className?: string`                                                                  | —      |
| `LeaveCard`       | `molecules/hr/LeaveCard.tsx`       | `leave: LeaveRequest; className?: string`                                                                                                                                                                       | —      |
| `OnboardingTask`  | `molecules/hr/OnboardingTask.tsx`  | `title: string; due: string; status: 'todo' \| 'in-progress' \| 'done'; assignee?: string; category?: string; className?: string`                                                                               | —      |
| `OrgChart`        | `molecules/hr/OrgChart.tsx`        | `nodes: OrgNode[]; title?: string; className?: string`                                                                                                                                                          | —      |
| `PayrollSummary`  | `molecules/hr/PayrollSummary.tsx`  | `period: string; gross: number; net: number; deductions?: number; bonus?: number; taxes?: number; currency?: string; className?: string`                                                                        | —      |
| `PerformanceCard` | `molecules/hr/PerformanceCard.tsx` | `employee: string; period: string; score: number; rating?: string; highlights?: string[]; className?: string`                                                                                                   | —      |
| `PolicyCard`      | `molecules/hr/PolicyCard.tsx`      | `title: string; summary?: string; version?: string; updatedAt?: string; category?: string; className?: string`                                                                                                  | —      |
| `RecruitmentCard` | `molecules/hr/RecruitmentCard.tsx` | `title: string; applicants: number; hired: number; openRoles: number; department?: string; deadline?: string; className?: string`                                                                               | —      |
| `TeamSummary`     | `molecules/hr/TeamSummary.tsx`     | `name: string; size: number; openRoles: number; location?: string; manager?: string; className?: string`                                                                                                        | —      |
| `TimesheetRow`    | `molecules/hr/TimesheetRow.tsx`    | `day: string; project: string; hours: number; overtime?: number; status: 'pending' \| 'approved' \| 'rejected'; className?: string`                                                                             | —      |
| `TrainingCard`    | `molecules/hr/TrainingCard.tsx`    | `title: string; provider: string; date: string; duration?: string; status: 'upcoming' \| 'in-progress' \| 'completed'; category?: string; className?: string`                                                   | —      |

## landing

Marketing, landing & careers.

| Component         | File                                    | Props                                                                                                                                      | Client |
| ----------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ------ |
| `AwardCard`       | `molecules/landing/AwardCard.tsx`       | `title: string; organization: string; year: string; description?: string; className?: string`                                              | —      |
| `BlogTeaser`      | `molecules/landing/BlogTeaser.tsx`      | `title: string; excerpt?: string; date: string; author: string; tags?: string[]; readTime?: string; className?: string`                    | —      |
| `ClientLogo`      | `molecules/landing/ClientLogo.tsx`      | `name: string; logo?: string; url?: string; className?: string`                                                                            | —      |
| `ContactForm`     | `molecules/landing/ContactForm.tsx`     | `title?: string; onSubmit?: (data: { name: string; email: string; message: string }) => void; className?: string`                          | client |
| `CtaBanner`       | `molecules/landing/CtaBanner.tsx`       | `title: string; description?: string; primaryLabel?: string; secondaryLabel?: string; className?: string`                                  | —      |
| `FAQItem`         | `molecules/landing/FAQItem.tsx`         | `question: string; answer: string; defaultOpen?: boolean`                                                                                  | client |
| `HeroSection`     | `molecules/landing/HeroSection.tsx`     | `title: string; subtitle?: string; badge?: string; primaryLabel?: string; secondaryLabel?: string; className?: string`                     | —      |
| `MilestoneCard`   | `molecules/landing/MilestoneCard.tsx`   | `year: string; title: string; description?: string; category?: string; className?: string`                                                 | —      |
| `PartnersRow`     | `molecules/landing/PartnersRow.tsx`     | `partners: string[]; title?: string; className?: string`                                                                                   | —      |
| `PlanCard`        | `molecules/landing/PlanCard.tsx`        | `name: string; price: string; period?: string; features: string[]; cta?: string; recommended?: boolean; note?: string; className?: string` | —      |
| `PricingCard`     | `molecules/landing/PricingCard.tsx`     | `name: string; price: string; period?: string; features: string[]; cta?: string; highlighted?: boolean; className?: string`                | —      |
| `ProcessStep`     | `molecules/landing/ProcessStep.tsx`     | `step: number; title: string; description: string; icon?: string; className?: string`                                                      | —      |
| `ServiceCard`     | `molecules/landing/ServiceCard.tsx`     | `title: string; description: string; icon?: string; features?: string[]; className?: string`                                               | —      |
| `StatHighlight`   | `molecules/landing/StatHighlight.tsx`   | `label: string; value: string; delta?: string; positive?: boolean; icon?: string; className?: string`                                      | —      |
| `TeamMemberCard`  | `molecules/landing/TeamMemberCard.tsx`  | `name: string; role: string; bio?: string; initials?: string; socials?: SocialLink[]; className?: string`                                  | —      |
| `TestimonialCard` | `molecules/landing/TestimonialCard.tsx` | `quote: string; author: string; role?: string; company?: string; rating?: number; initials?: string; className?: string`                   | —      |

## mail

Email, inbox & operations.

| Component        | File                                | Props                                                                                                                                                   | Client |
| ---------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| `AttachmentList` | `molecules/mail/AttachmentList.tsx` | `attachments: Attachment[]; onDownload?: (id: string) => void`                                                                                          | —      |
| `ComposeForm`    | `molecules/mail/ComposeForm.tsx`    | `defaultTo?: string; defaultSubject?: string; defaultBody?: string; onSubmit?: (values: ComposeFormValues) => void`                                     | client |
| `DraftItem`      | `molecules/mail/DraftItem.tsx`      | `to: string; subject: string; preview: string; updatedAt: string; onClick?: () => void`                                                                 | —      |
| `EmailRow`       | `molecules/mail/EmailRow.tsx`       | `from: string; subject: string; preview: string; time: string; unread?: boolean; active?: boolean; onClick?: () => void`                                | —      |
| `FolderItem`     | `molecules/mail/FolderItem.tsx`     | `label: string; count?: number; icon?: ReactNode; active?: boolean; onClick?: () => void`                                                               | —      |
| `InboxTable`     | `molecules/mail/InboxTable.tsx`     | `emails: Email[]; onSelect?: (id: string) => void`                                                                                                      | —      |
| `LabelBadges`    | `molecules/mail/LabelBadges.tsx`    | `labels: string[]; emptyText?: string`                                                                                                                  | —      |
| `LoadingOverlay` | `molecules/mail/LoadingOverlay.tsx` | `open: boolean; label?: string; variant?: 'spinner' \| 'dots' \| 'ring' \| 'ball' \| 'bars' \| 'infinity'; transparent?: boolean; onClose?: () => void` | client |
| `MessageThread`  | `molecules/mail/MessageThread.tsx`  | `subject: string; messages: Message[]; onReply?: (messageId: string) => void`                                                                           | client |
| `NavItem`        | `molecules/mail/NavItem.tsx`        | `label: string; href: string; icon?: ReactNode; badge?: string; active?: boolean; onClick?: () => void`                                                 | —      |
| `ReplyForm`      | `molecules/mail/ReplyForm.tsx`      | `to: string; subject: string; placeholder?: string; onSend?: (body: string) => void; onCancel?: () => void`                                             | client |
| `SearchResults`  | `molecules/mail/SearchResults.tsx`  | `query: string; results: Result[]; onSelect?: (id: string) => void`                                                                                     | —      |
| `SentItem`       | `molecules/mail/SentItem.tsx`       | `to: string; subject: string; preview: string; time: string; status?: 'delivered' \| 'failed'; onClick?: () => void`                                    | —      |
| `SignatureCard`  | `molecules/mail/SignatureCard.tsx`  | `name: string; role?: string; company?: string; email?: string; phone?: string; website?: string`                                                       | —      |
| `SpamItem`       | `molecules/mail/SpamItem.tsx`       | `from: string; subject: string; preview: string; time: string; flagged?: boolean; onReport?: () => void; onMoveToInbox?: () => void`                    | —      |
| `TrashItem`      | `molecules/mail/TrashItem.tsx`      | `from: string; subject: string; preview: string; time: string; onRestore?: () => void; onDeleteForever?: () => void`                                    | —      |

## media

Music, streaming & media.

| Component        | File                                 | Props                                                                                                                                                                     | Client |
| ---------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| `AlbumCard`      | `molecules/media/AlbumCard.tsx`      | `title: string; artist: string; year?: string; trackCount?: number; coverUrl?: string; onOpen?: () => void`                                                               | —      |
| `AlbumTracks`    | `molecules/media/AlbumTracks.tsx`    | `album?: string; artist?: string; tracks: Track[]; currentId?: string; onPlay?: (id: string) => void`                                                                     | —      |
| `ArtistCard`     | `molecules/media/ArtistCard.tsx`     | `name: string; imageUrl?: string; followers?: string; verified?: boolean; onOpen?: () => void`                                                                            | —      |
| `EpisodeCard`    | `molecules/media/EpisodeCard.tsx`    | `title: string; show: string; duration: string; description?: string; publishedAt?: string; progress?: number; onPlay?: () => void`                                       | —      |
| `LyricsView`     | `molecules/media/LyricsView.tsx`     | `lines: string[]; activeLine?: number`                                                                                                                                    | —      |
| `MoodBoard`      | `molecules/media/MoodBoard.tsx`      | `moods: Mood[]; selectedId?: string; onSelect?: (id: string) => void`                                                                                                     | —      |
| `NowPlayingBar`  | `molecules/media/NowPlayingBar.tsx`  | `title: string; artist: string; albumArt?: string; progress?: number; playing?: boolean; onToggle?: (playing: boolean) => void; onNext?: () => void; onPrev?: () => void` | client |
| `PlaylistCard`   | `molecules/media/PlaylistCard.tsx`   | `title: string; trackCount: number; author?: string; coverUrl?: string; onOpen?: () => void`                                                                              | —      |
| `PodcastCard`    | `molecules/media/PodcastCard.tsx`    | `title: string; host?: string; episodes?: number; imageUrl?: string; onOpen?: () => void`                                                                                 | —      |
| `QueueList`      | `molecules/media/QueueList.tsx`      | `tracks: QueueTrack[]; currentId?: string; onSelect?: (id: string) => void`                                                                                               | —      |
| `RadioStation`   | `molecules/media/RadioStation.tsx`   | `name: string; genre?: string; frequency?: string; listeners?: number; live?: boolean; onTune?: () => void`                                                               | —      |
| `RecentlyPlayed` | `molecules/media/RecentlyPlayed.tsx` | `items: Item[]; onSelect?: (id: string) => void`                                                                                                                          | —      |
| `SimilarArtists` | `molecules/media/SimilarArtists.tsx` | `artists: Artist[]; onSelect?: (id: string) => void`                                                                                                                      | —      |
| `StreamCard`     | `molecules/media/StreamCard.tsx`     | `title: string; platform: string; status?: 'live' \| 'offline' \| 'scheduled'; viewers?: number; thumbnailUrl?: string; onWatch?: () => void`                             | —      |
| `TrackRow`       | `molecules/media/TrackRow.tsx`       | `title: string; artist: string; duration: string; index?: number; playing?: boolean; onPlay?: () => void`                                                                 | —      |
| `VideoCard`      | `molecules/media/VideoCard.tsx`      | `title: string; channel: string; views: string; duration: string; thumbnailUrl?: string; onPlay?: () => void`                                                             | —      |

## news

News, magazine & sports.

| Component         | File                                 | Props                                                                                                                         | Client |
| ----------------- | ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- | ------ |
| `AnalysisCard`    | `molecules/news/AnalysisCard.tsx`    | `title: string; author?: string; time?: string; summary?: string; tags?: string[]; href?: string`                             | —      |
| `ArticleList`     | `molecules/news/ArticleList.tsx`     | `articles: ArticleListItem[]; title?: string`                                                                                 | —      |
| `BreakingNews`    | `molecules/news/BreakingNews.tsx`    | `headline: string; tag?: string; href?: string; live?: boolean`                                                               | —      |
| `CategoryNav`     | `molecules/news/CategoryNav.tsx`     | `categories: string[]; active?: string; onSelect?: (category: string) => void; ariaLabel?: string`                            | client |
| `CultureCard`     | `molecules/news/CultureCard.tsx`     | `title: string; category?: string; author?: string; date?: string; excerpt?: string; href?: string`                           | —      |
| `EditorialCard`   | `molecules/news/EditorialCard.tsx`   | `title: string; author?: string; date?: string; excerpt?: string; stance?: 'support' \| 'oppose' \| 'neutral'; href?: string` | —      |
| `HeadlineRow`     | `molecules/news/HeadlineRow.tsx`     | `title: string; section?: string; time?: string; href?: string; rank?: number`                                                | —      |
| `LiveUpdate`      | `molecules/news/LiveUpdate.tsx`      | `updates: LiveUpdateItem[]; title?: string; live?: boolean; initialVisible?: number`                                          | client |
| `MarketIndex`     | `molecules/news/MarketIndex.tsx`     | `name: string; value: number; change: number; changePercent?: number; currency?: string`                                      | —      |
| `OpinionColumn`   | `molecules/news/OpinionColumn.tsx`   | `columnists: Columnist[]; title?: string`                                                                                     | —      |
| `PhotoStory`      | `molecules/news/PhotoStory.tsx`      | `title: string; caption?: string; photographer?: string; href?: string`                                                       | —      |
| `ScoreBoard`      | `molecules/news/ScoreBoard.tsx`      | `home: TeamScore; away: TeamScore; period?: string; status?: string; showLeader?: boolean`                                    | —      |
| `SportsScoreCard` | `molecules/news/SportsScoreCard.tsx` | `sport: string; home: TeamScore; away: TeamScore; status?: string; period?: string`                                           | —      |
| `TrendingList`    | `molecules/news/TrendingList.tsx`    | `items: TrendingItem[]; title?: string`                                                                                       | —      |
| `VideoStory`      | `molecules/news/VideoStory.tsx`      | `title: string; duration: string; channel?: string; views?: string; href?: string; onPlay?: () => void`                       | —      |
| `WeatherCard`     | `molecules/news/WeatherCard.tsx`     | `city: string; temperature: number; condition: string; unit?: 'C' \| 'F'; high?: number; low?: number; humidity?: number`     | —      |

## social

Social, community & gaming.

| Component              | File                                        | Props                                                                                                                                                                                               | Client |
| ---------------------- | ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| `Backdrop`             | `molecules/social/Backdrop.tsx`             | `open: boolean; onClose?: () => void; children?: ReactNode; className?: string; opaque?: boolean`                                                                                                   | client |
| `BottomNavigation`     | `molecules/social/BottomNavigation.tsx`     | `items: BottomNavigationItem[]; value: string; onChange: (value: string) => void; position?: 'static' \| 'fixed'; className?: string`                                                               | —      |
| `CommentList`          | `molecules/social/CommentList.tsx`          | `comments: Comment[]; title?: string`                                                                                                                                                               | —      |
| `EventCard`            | `molecules/social/EventCard.tsx`            | `title: string; date: string; location?: string; attendees?: number; price?: string; month?: string; day?: number`                                                                                  | —      |
| `FloatingActionButton` | `molecules/social/FloatingActionButton.tsx` | `icon: ReactNode; label: string; onClick?: () => void; position?: FabPosition; size?: FabSize; variant?: 'primary' \| 'secondary' \| 'accent' \| 'neutral'; disabled?: boolean; className?: string` | —      |
| `FriendRequest`        | `molecules/social/FriendRequest.tsx`        | `name: string; mutual?: number; avatar?: string; onAccept?: () => void; onDecline?: () => void`                                                                                                     | —      |
| `GroupCard`            | `molecules/social/GroupCard.tsx`            | `name: string; members: number; description?: string; category?: string`                                                                                                                            | —      |
| `LikeButton`           | `molecules/social/LikeButton.tsx`           | `count?: number; label?: string; active?: boolean; onToggle?: (active: boolean) => void`                                                                                                            | client |
| `MessagePreview`       | `molecules/social/MessagePreview.tsx`       | `name: string; preview: string; time?: string; unread?: number; avatar?: string`                                                                                                                    | —      |
| `NotificationItem`     | `molecules/social/NotificationItem.tsx`     | `message: string; time?: string; type?: 'like' \| 'comment' \| 'follow' \| 'mention' \| 'system'; read?: boolean; avatar?: string`                                                                  | —      |
| `PostCard`             | `molecules/social/PostCard.tsx`             | `author: string; content: string; likes?: number; comments?: number; shares?: number; time?: string; avatar?: string`                                                                               | —      |
| `ProfileHeader`        | `molecules/social/ProfileHeader.tsx`        | `name: string; handle?: string; bio?: string; followers?: number; following?: number; avatar?: string; isVerified?: boolean`                                                                        | —      |
| `ReactionPicker`       | `molecules/social/ReactionPicker.tsx`       | `options?: ReactionOption[]; onSelect?: (reaction: string) => void`                                                                                                                                 | client |
| `ShareRow`             | `molecules/social/ShareRow.tsx`             | `shares?: number; onShare?: () => void; onCopy?: () => void; onMessage?: () => void`                                                                                                                | —      |
| `StoryStrip`           | `molecules/social/StoryStrip.tsx`           | `stories: Story[]; active?: boolean; onSelect?: (story: Story) => void`                                                                                                                             | —      |
| `SuggestionCard`       | `molecules/social/SuggestionCard.tsx`       | `name: string; handle?: string; reason?: string; avatar?: string; onFollow?: () => void; onDismiss?: () => void`                                                                                    | —      |

## store

Storefront & e-commerce.

| Component         | File                                  | Props                                                                                                                                                        | Client |
| ----------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------ |
| `BundleCard`      | `molecules/store/BundleCard.tsx`      | `title: string; items: string[]; price: number; originalPrice?: number; currency?: string; badge?: string`                                                   | —      |
| `CartItem`        | `molecules/store/CartItem.tsx`        | `name: string; price: number; quantity: number; onQuantityChange: (quantity: number) => void; onRemove?: () => void; imageLabel?: string; currency?: string` | client |
| `CategoryCard`    | `molecules/store/CategoryCard.tsx`    | `name: string; productCount?: number; imageLabel?: string`                                                                                                   | —      |
| `CheckoutSummary` | `molecules/store/CheckoutSummary.tsx` | `subtotal: number; shipping?: number; tax?: number; discount?: number; total: number; itemCount?: number; currency?: string`                                 | —      |
| `ColorSwatch`     | `molecules/store/ColorSwatch.tsx`     | `colors: Swatch[]; selected?: string; onSelect?: (name: string) => void`                                                                                     | —      |
| `CompareTable`    | `molecules/store/CompareTable.tsx`    | `products: string[]; rows: CompareColumn[]`                                                                                                                  | —      |
| `CouponBox`       | `molecules/store/CouponBox.tsx`       | `onApply: (code: string) => void; placeholder?: string`                                                                                                      | client |
| `OrderSummary`    | `molecules/store/OrderSummary.tsx`    | `orderNumber: string; status: string; placedAt?: string; paymentMethod?: string; itemCount?: number; total: number; currency?: string`                       | —      |
| `ProductCard`     | `molecules/store/ProductCard.tsx`     | `name: string; price: number; imageLabel?: string; rating?: number; reviews?: number; badge?: string; currency?: string`                                     | —      |
| `ProductRow`      | `molecules/store/ProductRow.tsx`      | `name: string; price: number; sku?: string; category?: string; inStock?: boolean; currency?: string`                                                         | —      |
| `ShippingInfo`    | `molecules/store/ShippingInfo.tsx`    | `method: string; eta: string; cost?: number; carrier?: string; currency?: string; free?: boolean`                                                            | —      |
| `SizePicker`      | `molecules/store/SizePicker.tsx`      | `sizes: string[]; defaultSelected?: string; onSelect?: (size: string) => void; label?: string`                                                               | client |
| `StockBadge`      | `molecules/store/StockBadge.tsx`      | `status: 'in-stock' \| 'low-stock' \| 'out-of-stock'; quantity?: number`                                                                                     | —      |
| `StoreCard`       | `molecules/store/StoreCard.tsx`       | `name: string; rating?: number; reviewCount?: number; deliveryTime?: string; category?: string; logoLabel?: string`                                          | —      |
| `StoreReviewCard` | `molecules/store/StoreReviewCard.tsx` | `author: string; rating: number; comment: string; date?: string; verified?: boolean`                                                                         | —      |
| `WishlistItem`    | `molecules/store/WishlistItem.tsx`    | `name: string; price: number; addedDate?: string; currency?: string; onAddToCart?: () => void; onRemove?: () => void`                                        | —      |

## support

Support, knowledge & system.

| Component     | File                                | Props                                                                                                                                                              | Client |
| ------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------ |
| `Accordion`   | `molecules/support/Accordion.tsx`   | `items: AccordionItem[]; multiple?: boolean`                                                                                                                       | client |
| `Breadcrumbs` | `molecules/support/Breadcrumbs.tsx` | `items: Crumb[]`                                                                                                                                                   | —      |
| `Card`        | `molecules/support/Card.tsx`        | `title?: string; description?: string; action?: ReactNode; children: ReactNode`                                                                                    | —      |
| `Dialog`      | `molecules/support/Dialog.tsx`      | `open: boolean; onClose: () => void; title?: string; description?: string; children?: ReactNode; footer?: ReactNode; closeOnBackdrop?: boolean`                    | client |
| `Drawer`      | `molecules/support/Drawer.tsx`      | `open: boolean; onClose: () => void; title?: string; side?: 'left' \| 'right'; overlay?: boolean; widthClass?: string; children?: ReactNode; footer?: ReactNode`   | client |
| `List`        | `molecules/support/List.tsx`        | `items: ListItem[]; title?: string`                                                                                                                                | —      |
| `Masonry`     | `molecules/support/Masonry.tsx`     | `items: ReactNode[]; columns?: 2 \| 3 \| 4; gap?: 'sm' \| 'md' \| 'lg'; className?: string`                                                                        | —      |
| `MenuGroup`   | `molecules/support/MenuGroup.tsx`   | `sections: MenuGroupSection[]`                                                                                                                                     | —      |
| `Modal`       | `molecules/support/Modal.tsx`       | `open: boolean; onClose?: () => void; title?: string; children: ReactNode; action?: ReactNode`                                                                     | —      |
| `Popover`     | `molecules/support/Popover.tsx`     | `trigger: ReactElement<{ onClick?: () => void; 'aria-haspopup'?: string; 'aria-expanded'?: boolean; }>; children: ReactNode; align?: 'start' \| 'center' \| 'end'` | client |
| `ScrollArea`  | `molecules/support/ScrollArea.tsx`  | `children?: ReactNode; maxHeight?: number \| string; className?: string; innerClassName?: string`                                                                  | —      |
| `Sheet`       | `molecules/support/Sheet.tsx`       | `open: boolean; onClose: () => void; title?: string; side?: 'left' \| 'right' \| 'top' \| 'bottom'; children?: ReactNode; footer?: ReactNode`                      | client |
| `Steps`       | `molecules/support/Steps.tsx`       | `steps: Step[]; current: number`                                                                                                                                   | —      |
| `Table`       | `molecules/support/Table.tsx`       | `columns: Column[]; rows: Record<string, string \| number \| boolean \| null \| undefined>[]; caption?: string; striped?: boolean; compact?: boolean`              | —      |
| `Tabs`        | `molecules/support/Tabs.tsx`        | `tabs: Tab[]; value: string; onChange: (value: string) => void`                                                                                                    | client |
| `Timeline`    | `molecules/support/Timeline.tsx`    | `items: TimelineItem[]`                                                                                                                                            | —      |
| `Toast`       | `molecules/support/Toast.tsx`       | `message: string; variant?: ToastVariant; duration?: number; onClose?: () => void`                                                                                 | client |

## travel

Travel, real estate & property.

| Component         | File                                   | Props                                                                                                                                                                           | Client |
| ----------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| `AmenityList`     | `molecules/travel/AmenityList.tsx`     | `amenities: string[]; title?: string`                                                                                                                                           | —      |
| `AttractionCard`  | `molecules/travel/AttractionCard.tsx`  | `name: string; location?: string; rating?: number; price?: number; duration?: string; description?: string; currency?: string`                                                  | —      |
| `BookingCard`     | `molecules/travel/BookingCard.tsx`     | `reference: string; title: string; date: string; status: string; price?: number; guests?: number; currency?: string`                                                            | —      |
| `ChecklistCard`   | `molecules/travel/ChecklistCard.tsx`   | `items: ChecklistItem[]; title?: string; defaultChecked?: string[]`                                                                                                             | client |
| `DestinationCard` | `molecules/travel/DestinationCard.tsx` | `name: string; country?: string; price?: number; rating?: number; imageLabel?: string; currency?: string`                                                                       | —      |
| `FlightCard`      | `molecules/travel/FlightCard.tsx`      | `airline: string; from: string; to: string; departureTime: string; arrivalTime: string; price: number; duration?: string; stops?: number; flightNo?: string; currency?: string` | —      |
| `HotelCard`       | `molecules/travel/HotelCard.tsx`       | `name: string; location: string; pricePerNight: number; rating?: number; stars?: number; imageLabel?: string; currency?: string`                                                | —      |
| `ItineraryList`   | `molecules/travel/ItineraryList.tsx`   | `items: ItineraryItem[]`                                                                                                                                                        | —      |
| `LoyaltyCard`     | `molecules/travel/LoyaltyCard.tsx`     | `tier: string; points: number; pointsToNext?: number; nextTier?: string; program?: string`                                                                                      | —      |
| `MapPreview`      | `molecules/travel/MapPreview.tsx`      | `placeName: string; address?: string; label?: string`                                                                                                                           | —      |
| `PriceBreakdown`  | `molecules/travel/PriceBreakdown.tsx`  | `items: PriceBreakdownItem[]; currency?: string; title?: string`                                                                                                                | —      |
| `ReviewSummary`   | `molecules/travel/ReviewSummary.tsx`   | `average: number; count: number; breakdown?: ReviewBreakdown[]`                                                                                                                 | —      |
| `SearchFilters`   | `molecules/travel/SearchFilters.tsx`   | `onSearch?: (query: string) => void; sortOptions?: string[]; defaultSort?: string; placeholder?: string`                                                                        | client |
| `TransportOption` | `molecules/travel/TransportOption.tsx` | `type: TransportType; provider: string; duration: string; price: number; departure?: string; currency?: string`                                                                 | —      |
| `TripSummary`     | `molecules/travel/TripSummary.tsx`     | `destination: string; duration: string; travelers?: number; budget?: number; startDate?: string; currency?: string`                                                             | —      |
| `WeatherForecast` | `molecules/travel/WeatherForecast.tsx` | `days: ForecastDay[]`                                                                                                                                                           | —      |

---

[Back to index](README.md)
