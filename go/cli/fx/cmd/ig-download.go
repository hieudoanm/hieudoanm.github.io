// Package cmd ...
package cmd

import (
	"fmt"
	"io"
	"log"
	"net/http"
	"os"

	"github.com/PuerkitoBio/goquery"
	"github.com/spf13/cobra"
)

// downloadCmd represents the download command
var igDownloadCmd = &cobra.Command{
	Use:   "download",
	Short: "A brief description of your command",
	Long: `A longer description that spans multiple lines and likely contains examples
and usage of using your command. For example:

Cobra is a CLI library for Go that empowers applications.
This application is a tool to generate the needed files
to quickly create a Cobra application.`,
	Run: func(cmd *cobra.Command, args []string) {
		id, _ := cmd.Flags().GetString("id")
		link, _ := cmd.Flags().GetString("link")
		output, _ := cmd.Flags().GetString("output")
		if id == "" && link == "" {
			log.Fatal("Missing id or link")
		}

		var url string = link
		if link == "" {
			url = fmt.Sprintf("https://www.instagram.com/p/%s/", id)
		}
		DownloadPost(url, output)
	},
}

func init() {
	igCmd.AddCommand(igDownloadCmd)

	igDownloadCmd.PersistentFlags().String("id", "", "Instagram - ID")
	igDownloadCmd.PersistentFlags().String("link", "", "Instagram - Link")
	igDownloadCmd.PersistentFlags().String("output", "", "Instagram - Output")

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// igDownloadCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// igDownloadCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}

// DownloadPost ...
func DownloadPost(url string, output string) {
	log.Println("url", url)
	var embedURL string = fmt.Sprintf("%sembed/", url)
	log.Println("embedURL", embedURL)

	res, err := http.Get(embedURL)
	if err != nil {
		log.Fatal(err)
	}
	defer res.Body.Close()

	doc, _ := goquery.NewDocumentFromReader(res.Body)
	if err != nil {
		log.Fatal(err)
	}

	doc.Find(".Content img").Each(func(index int, s *goquery.Selection) {
		src, _ := s.Attr("src")
		DownloadImage(src, index, output)
	})

	log.Println("Download Completed")
}

// DownloadImage ...
func DownloadImage(url string, index int, output string) {
	response, e := http.Get(url)
	if e != nil {
		log.Fatal(e)
	}
	defer response.Body.Close()

	homeDir, err := os.UserHomeDir()
	if err != nil {
		log.Fatal(err)
	}
	var downloadsDir string = fmt.Sprintf("%s/Downloads", homeDir)

	var outputDir string = downloadsDir
	if output != "" {
		outputDir = output
	}

	if _, err := os.Stat(outputDir); os.IsNotExist(err) {
		err := os.Mkdir(outputDir, os.ModePerm)
		if err != nil {
			log.Fatal(err)
		}
	}

	file, err := os.Create(fmt.Sprintf("%s/image-%d.jpg", outputDir, index))
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	_, err = io.Copy(file, response.Body)
	if err != nil {
		log.Fatal(err)
	}
	var message = fmt.Sprintf("image-%d.jpg Completed", index)
	log.Println(message)
}
