package cv

type CVData struct {
	Personal      Personal      `yaml:"personal" json:"personal"`
	Summary       string        `yaml:"summary" json:"summary"`
	Experience    []Experience  `yaml:"experience" json:"experience"`
	Education     []Education   `yaml:"education" json:"education"`
	Projects      []Project     `yaml:"projects" json:"projects"`
	Skills        []SkillGroup  `yaml:"skills" json:"skills"`
	Certifications []Certification `yaml:"certifications" json:"certifications"`
	Languages     []Language    `yaml:"languages" json:"languages"`
	Interests     string        `yaml:"interests" json:"interests"`
	References    []Reference   `yaml:"references" json:"references"`
}

type Personal struct {
	FullName string `yaml:"fullName" json:"fullName"`
	JobTitle string `yaml:"jobTitle" json:"jobTitle"`
	Email    string `yaml:"email" json:"email"`
	Phone    string `yaml:"phone" json:"phone"`
	Address  string `yaml:"address" json:"address"`
	Website  string `yaml:"website" json:"website"`
	Linkedin string `yaml:"linkedin" json:"linkedin"`
	Github   string `yaml:"github" json:"github"`
}

type Experience struct {
	ID          string `yaml:"id" json:"id"`
	Company     string `yaml:"company" json:"company"`
	Role        string `yaml:"role" json:"role"`
	Location    string `yaml:"location" json:"location"`
	StartDate   string `yaml:"startDate" json:"startDate"`
	EndDate     string `yaml:"endDate" json:"endDate"`
	Description string `yaml:"description" json:"description"`
}

type Education struct {
	ID              string `yaml:"id" json:"id"`
	School          string `yaml:"school" json:"school"`
	Degree          string `yaml:"degree" json:"degree"`
	Field           string `yaml:"field" json:"field"`
	Location        string `yaml:"location" json:"location"`
	StartDate       string `yaml:"startDate" json:"startDate"`
	EndDate         string `yaml:"endDate" json:"endDate"`
	GPA             string `yaml:"gpa" json:"gpa"`
	Description     string `yaml:"description" json:"description"`
	RelevantSubjects string `yaml:"relevantSubjects" json:"relevantSubjects"`
	Interests       string `yaml:"interests" json:"interests"`
}

type Project struct {
	ID           string `yaml:"id" json:"id"`
	Name         string `yaml:"name" json:"name"`
	Organization string `yaml:"organization" json:"organization"`
	Description  string `yaml:"description" json:"description"`
	Technologies string `yaml:"technologies" json:"technologies"`
}

type SkillGroup struct {
	ID       string `yaml:"id" json:"id"`
	Category string `yaml:"category" json:"category"`
	Items    string `yaml:"items" json:"items"`
}

type Certification struct {
	ID     string `yaml:"id" json:"id"`
	Name   string `yaml:"name" json:"name"`
	Issuer string `yaml:"issuer" json:"issuer"`
	Date   string `yaml:"date" json:"date"`
}

type Language struct {
	ID          string `yaml:"id" json:"id"`
	Name        string `yaml:"name" json:"name"`
	Proficiency string `yaml:"proficiency" json:"proficiency"`
}

type Reference struct {
	ID           string `yaml:"id" json:"id"`
	Name         string `yaml:"name" json:"name"`
	Title        string `yaml:"title" json:"title"`
	Organization string `yaml:"organization" json:"organization"`
	Email        string `yaml:"email" json:"email"`
}
