# Project Title
MyPortfolio, added on 2024-07-14. This is an exact copy of the proposal I submitted on Synapse. I forgot to add a ReadMe for the front-end as well. For completness, I now include it.

## Overview

MyPortfolio is a web application that allows students to create and manage an online portfolio showcasing their projects, skills, and academic achievements. This platform provides students with a way to share their work with potential employers, educators, and peers.

### Problem

Currently, students can only showcase their skills through assignments evaluated by their teaching team, limiting their exposure to a wider audience. Many projects remain unseen due to intellectual property restrictions. For example, in many post-secondary institutions, showcasing completed assignments can violate academic integrity. This app addresses the need for a platform where students can publicly display their work and skills, helping them stand out in job applications and university admissions. Students can abide by intellectual property regulations by modifying their visibility settings from public to private.

### User Profile

- Students: Create profiles, upload projects, tag skills, and set visibility settings.
    
- Educators: To provide feedback on student projects and endorse skills. (Optional. Please consult below.)
    
- Employers and University Admissions Officers: To view student portfolios for potential opportunities.
  
### Special considerations:

- Privacy: Students need control over the visibility of their projects. This is a “nice to have.”
   
### Features

- Project Upload: Students can upload various types of projects (documents, code, videos).
    - Users are presented with an “upload form,” as shown in the “add project” mockup image.
- Skill Tags: Projects can be tagged with relevant skills (e.g., data science, machine learning, calculus).
- Project information includes subject tags and general tags. General tags refer to tags that may represent the project’s classification or theme. For example, a study that focuses on the effects of climate change in Canadian agriculture may use the tag “climate change.” Subject tags here can be “environmental science” and “agriculture.”

- Users can view their dashboard where a preview of their projects are on display. A “nice to have” involves allowing users to filter the projects according to subject, skills, or visibility.
    
- Users can gain more information on a project’s specifics by selecting the project from the dashboard page.
    
    - Each project includes a description, subject categories, skills categories, and the project URL. A “nice to have” is integrating Amazon S3 for the project’s files’ storage.
    

- Users can create an account to upload their projects.
    - Users can login to their accounts to preview, upload, and edit their projects.
    
-   Visibility Settings: Students can choose who can view their projects (public, private, specific individuals).This feature is “nice to have”.
    
-   Integration with LinkedIn/Resume: Generate shareable links to include in LinkedIn profiles or resumes. This feature is a “nice to have.”
    
-   Peer and Educator Feedback: Allow educators and peers to provide feedback and endorsements. This feature is a “nice to have.”

## Implementation

### Tech Stack

-   React
    
-   MySQL
    
-   Node.js with Express
    
-   Client libraries:
    - Axios
    
    - React
    
    - React-router
    

-  Server libraries:
    
    -   Knex
    -   Express
    -   Bcrypt for password hashing
    

-   Storage:
    -   Amazon S3 for storing project files.
    
-   Authentication:
    -   JWT for user authentication.
    

-   Styling:
    -   SCSS for styling.
 
**APIs**

-   Amazon S3: For file storage (“nice to have”)
    -   If time does not permit, users will access their project files by using their project URL.
    
-   LinkedIn API: For integration with LinkedIn profiles (“nice to have”).
    

**Sitemap**:
-   Sign Up / Login Page: Forms for user authentication.
-   Dashboard: Overview of user’s projects and profile information.
-   Project Upload Page: Form to upload new projects.
-   Project Detail Page: Detailed view of individual projects.
-   Profile Page: User profile information and settings.
-   Feedback Page: View and manage feedback on projects. (“Nice to have”)
    
### Mockups

#### Register
![](./assets/mockups/register.jpg)

#### Login Page

![](./assets/mockups/login.jpg)

#### Dashboard

![](./assets/mockups/dashboard.jpg)

#### Project Upload Page

![](./assets/mockups/project-upload.jpg)

#### Project Detail Page

![](./assets/mockups/project-details.jpg)

#### Profile Page

![](./assets/mockups/profile.jpg)

### Data

![](./assets/mockups/sql-diagram.png)

### Endpoints

#### Profile endpoints

**POST /users/register:**

-   Register a new user.  
-   Parameters:
    -   Email: User’s email
    -   Password: User’s provided password.
    -   Name: User’s name
    
Response:
```
{
    "id": 1,
    "email": "beatriz.done@example.com",
    "name": "Beatriz Done",
    "message": "User registered successfully."
}

```
**POST /users/login:**

-   Login a user
-   Parameters:
    -   Email: User’s email
    -   Password: User’s provided password
Response:
```
{
    "token": "seyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6I..."
},
```
 
**GET /users/profile**

-   Get user profile information.
-   Parameters:
    -   token (optional): JWT used to authenticate and determine if the user has access to a profile. Note that adding visibility settings for users is a “nice to have.” In the case that my project does not include the visibility settings, then this route will have no parameters.

Response:
```
    {
        "id": 1,
        "email": "beatriz.done@example.com",
        "name": "Beatriz Done",
        "display_name": "Beatriz",
        "school_email": "19dbcd@queensu.ca",
        "phone_number": "123-456-7890",
        "date_of_birth": "2000-01-01",
        "country_of_study": "Canada",
        "languages_spoken": "English, Spanish",
        "home_address": "123 Hotel Transylvania",
        "skills": "JavaScript, React",
        "visibility": "public",
        "updated_at": "2024-07-07T12:34:56.789Z"
    }
```

**PUT /users/profile**
- Edit the user profile.
- Parameters:
    -   Token: JWT token used to authenticate the user.
Response
```
{
    "id": 1,
    "email": "beatriz.done@example.com",
    "name": "Beatriz Done",
    "display_name": "Beatriz",
    "school_email": "19dbcd@queensu.ca",
    "phone_number": "123-456-7890",
    "date_of_birth": "2000-01-01",
    "country_of_study": "Canada",
    "languages_spoken": "English, Spanish",
    "home_address": "123 Hotel Transylvania",
    "skills": "JavaScript, React",
    "visibility": "public",
    "updated_at": "2024-07-07T12:34:56.789Z"
}
```
#### Project endpoints:

**GET /projects/:id**

-   Get details of a specific project by ID.
-   Parameters:
    -   id: the ID of the project to retrieve.
    -   token (optional): JWT used to authenticate and determine if the user has access to the project.

Response:
```
{
    "id": 1,
    "title": "Machine Learning Project",
    "project_url": "https://example.com/project1",
    "subject": "Data Science",
    "skills": "Python, Machine Learning",
    "tags": "AI, Data",
    "visibility": "public",
    "user_id": 1,
    "username": "BeatrizDone",
    "updated_at": "2023-07-10T12:34:56.789Z"
}
```
    
**POST /projects**

-   Upload a new project.
-   Parameters:
    -   Title
    -   Project_url
    -   Subject
    -   Skills: skills used for the particular project.
    -   Tags: Tags related to the project. Example: “data analytics” tag for a tag that requires data manipulation and analysis.
    -   Visibility (nice-to-have): visibility status (“private” or “public”)
    -   Token: JWT token to authenticate the user.

Response:
```
{
    "id": 2,
    "title": "Project two",
    "project_url": "https://example.com secondproject",
    "subject": "Computer Science",
    "skills": "JavaScript, React",
    "tags": "Web Development",
    "visibility": "private",
    "user_id": 1,
    "username": "BeatrizDone",
    "updated_at": "2023-07-10T12:34:56.789Z"
}
```
**GET /projects**:

-   Get all projects.  
-   Parameters:
    -   Token (nice to have): JWT token to authenticate and determine if the user has access to private projects.
Response:
```
[
    {
        "id": 1,
        "title": "Machine Learning Project",
        "project_url": "https://example.com/project1",
        "subject": "Data Science",
        "skills": "Python, Machine Learning",
        "tags": "AI, Data",
        "visibility": "public",
        "user_id": 1,
        "username": "BeatrizDone",
        "updated_at": "2023-07-10T12:34:56.789Z"
    },
    ...
]
```
**PUT /projects/:id**

-   Update a project.
-   Parameters:
    -   Id: The id of the project to update
    -   Token: JWT token to authenticate the user

Response
```
{
    "id": 1,
    "title": "Updated Project",
    "project_url": "https://example.com/updatedproject",
    "subject": "Computer Science",
    "skills": "JavaScript, React, Node.js",
    "tags": "Web Development, Backend",
    "visibility": "public",
    "user_id": 1,
    "username": "JohnDoe",
    "updated_at": "2023-07-10T12:34:56.789Z"
}
```
**DELETE /projects/:id**

-   Delete a project.
-   Parameters
    -   Id: The id of the project to update
    -   Token: JWT token to authenticate the user

Response:
```
{
    "message": "Project deleted successfully."
}
```
#### Feedback Endpoints:

As mentioned, the feedback section for my application is a “nice to have.” For the sake of completeness, I include the endpoints for this section.

**POST /projects/:id/feedback**

-   Add feedback to a project.
-   Parameters:
    -   id: Project id as number
    -   token (optional): JWT used to add user feedback
    
Response:
```
{
    "id": 1,
    "project_id": 1,
    "user_id": 2,
    "feedback_text": "Amazzzing work!",
    "created_at": "2023-07-10T12:34:56.789Z"
}
```
**GET /projects/:id/feedback**

-   Get feedback for a project. 
-   Parameters: 
    -   id: Project id as number
    -   token (optional): JWT used to add user feedback

Response:
```
[
    {
        "id": 1,
        "project_id": 1,
        "user_id": 2,
        "feedback_text": "Great project!",
        "created_at": "2023-07-10T12:34:56.789Z",
        "username": "JaneDoe"
    },
    ...
]
```
### Auth

-   Yes, the project includes user registration, login, and profile management. Authentication will be implemented using JWT (JSON Web Tokens) to securely manage user sessions.
    
-   Before implementing authentication, all API requests will use a placeholder user with ID 1. Authentication will be integrated after the core features are established.

- Once authentication is added:

    -   Store the JWT in localStorage and ensure it is removed when the user logs out.
        
    -   Implement states to reflect whether a user is logged in or not, displaying different UI elements as outlined in the mockups.
    

## Roadmap

#### Roadmap initial steps

-   Create client
    -   React project with routes and boilerplate pages.
    -   Include basic components and pages (Register, Login, Dashboard, Project Details).

-   Create server:
    -   express project with routing, with placeholder 200 responses
    -   Design the database schema and create initial migrations.
    
-   Define the schema for “users”, “projects,” and “feedback”. The feedback table is a “nice to have.”
    
-   Create migrations using Knex.js
    
-   Create seeds with sample data.
   

#### Roadmap Features

-   Feature: Create account
    -   Implement register page and form
    -   Create the “POST /users/register” endpoint.
    

-   Feature: Login:
    -   Implement the login page and form.
    -   Create the POST /users/login endpoint.
    
-   Feature: User Profile
    -   Implement the user profile page to display user information.
    -   Create the GET /users/profile/:id endpoint.
    -   Create the GET /users/profile endpoint.
    -   Create the PUT /users/profile endpoint.
    

-   Feature: User dashboard
    -   Develop the dashboard to display user's projects.
    -   Implement project upload functionality.
    -   Create the POST /projects endpoint.
    

-   Feature: View Project
    -   Implement the project detail view page.
    -   Create the GET /projects/:id endpoint.
    
-   Feature: Edit Project (optional)
    -   Implement functionality to edit project details.
    -   Create the PUT /projects/:id endpoint.

-   Feature: Delete Project (optional)
    -   Implement functionality to delete a project.
    -   Create the DELETE /projects/:id endpoint to handle project deletion.
    
-   Design the database schema and create initial migrations.
    
-   Define the schema for “users”, “projects,” and “feedback”. The feedback table is a “nice to have.”
    
-   Develop the user dashboard and project upload functionality.
    
-   Implement project display and detail views.
    
-   Perform thorough testing and fix bugs.
    
-   If time permits, perform the “feedback sections.” These include
    - adding the POST /projects/:id/feedback endpoint to handle feedback submission
    - Adding the GET /projects/:id/feedback endpoint to retrieve feedback for a project.
    
-   DEMO DAY

## Nice-to-haves

-   Search Functionality: Enable searching for projects and users based on skills and tags.
    
-   Set up Amazon S3 for file storage.
    
-   Implement real-time notifications for feedback and endorsements.
    
-   Integrate feedback and endorsements
    
-   Integrate with LinkedIn for shareable links.
    
-   Allow users to reset their password after clicking the “forgot password” in the user login/register page sections.
    
-   Add visibility settings for each project. For now, each user has a public profile.
    
-   Add profile visibility. A user can choose to have a “public” or “private account.”
    
-   Filter among projects for specific criteria. Examples include filtering for user_id or visibility.
    
-   Allow users to contact other users. For example, a potential employer may wish to contact a student after having consulted their project dashboard.
