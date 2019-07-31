console.log(links)

links.map((link, index) => new ListItem({ link, index }).initializeComponent())
