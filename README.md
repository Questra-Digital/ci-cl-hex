# cimpl-hex
***Towards limitless productive learning***


A platform that supports collective intelligence mediated towards productive learning for individuals and organizations.



Students of 4 year degree programs delvier project over projects but they all only end up in librarys. At CIMPL we will connect professionals, faculty and students through agile and DevOps enabled platform to support collective and practicle learning while working on real-life problems.



How might we make our youth more productive?



## Development Environment

### Pre-requisite
- Install Docker

### Fork the Git Repository
Click the Fork button on the following GIthub Repository page and create your own copy of the project


### Setup hosts file for dev domains

Open `/etc/hosts` file potentially using `sudo vim.tiny /etc/hosts` and add following entries
```bash
127.0.0.1 cms.local
127.0.0.1 web.local
```

### Run Project
In the root folder run `docker compose up -d --build` command to start the project. Following urls in project should 
