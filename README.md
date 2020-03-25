# Classlab

[![N|Solid](https://edvolution.io/wp-content/uploads/2019/11/cropped-edvolution-3-201x62.png)](https://edvolution.io/#contacto)

##### Google Cloud Shell
Provisioning of courses within the classroom, these courses are provisioned with teachers and students. The configuration of the courses is within a [spreadsheet template](https://docs.google.com/spreadsheets/d/1Ug6ud1PKYWWHgiYCGGrrX3b7GpQ7dHiWW_oLFHP-uAc/edit?usp=sharing)

---
### Dependencies

  - [Node v10.x](https://github.com/nodesource/distributions/blob/master/README.md)
  - [Google Cloud SDK](https://cloud.google.com/sdk/docs/downloads-interactive?hl=es-419)
  - [Google Cloud Project](https://console.cloud.google.com)

---
### Prepare project in GCP (Configuration)

1. [Create project in GCP](https://console.cloud.google.com/projectcreate)
2. Go to configure **[OAuth consent screen](https://console.cloud.google.com/apis/credentials/consent)**

- User Type label: Internal (Click create)

![](https://raw.githubusercontent.com/pablogenesiswhat/Classlab/master/IMG/userType.PNG)

- Assign name to the application and click on create button

![](https://raw.githubusercontent.com/pablogenesiswhat/Classlab/master/IMG/userType_appName.PNG)

---
#### Installation
Go to the **[Cloud Shell](https://ssh.cloud.google.com/cloudshell/editor)** in **GCP**
```sh
$ gcloud config set project <project_id>
$ git clone https://github.com/pablogenesiswhat/Classlab.git && cd Classlab && ./install.sh
```
**Restart console for the application to work.**

---
#### Utilization

The main command is **clab**
1. Initialize the app with your google account
    ```sh
    $ clab login
    ```
2. Copy **[spreadsheet template](https://docs.google.com/spreadsheets/d/1Ug6ud1PKYWWHgiYCGGrrX3b7GpQ7dHiWW_oLFHP-uAc/edit?usp=sharing)** your Google account
    - The template has two sheets: Classes and Users. You can add up to 5 classes with 50 students and 20 teachers **(The instructions of the functionality are inside comments of the spreadsheet)**.
    ![](https://raw.githubusercontent.com/pablogenesiswhat/Classlab/master/IMG/copy_template.png)
    - Copy the **id** of the sheet you just copied to your account.
    ![](https://raw.githubusercontent.com/pablogenesiswhat/Classlab/master/IMG/id_spreadsheet.PNG)

3. Type the commands:
    ```sh
    $ clab create
    ```
    Paste the **spreadsheet id** that was obtained with the URL and press enter

Type "**clab help**" to know more options
```sh
$ clab help
```
