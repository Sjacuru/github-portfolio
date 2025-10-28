<<<<<<< HEAD
# Portfolio Template

### A beautiful minimal and accessible portfolio template for Developers ✨.

To View the live site click [here &rarr;](https://portfolio-template.surge.sh)

![Portfolio Gif](/images/portfolio.gif)

## Want to learn How to create a template like this ?

You can watch [this video series](https://www.youtube.com/watch?v=1nchVfpMGSg&list=PLwJBGAxcH7GzdavgKlCACbESzr-40lw3L) on my youtube channel where I re-create this from scratch. 



## Features

- Clean, Simple and Modern UI Design.
- Uses No CSS or JavaScript Frameworks or libraries as dependencies.
- Built with only HTML, CSS and a bit of JavaScript 🔨.
- Well Organized Documentation.
- Keyboard support.
- Fully Responsive.
- Loads fast ⚡.

## Lighthouse Report

![Lighthouse Report](/images/lighthouse-report.png)

### Contributions are warmly welcomed ❤️.

## Getting Started 🚀

You'll need [Git](https://git-scm.com) to be installed on your computer. 
```
# Clone this repository
$ git clone https://github.com/nisarhassan12/portfolio-template
```

If you don't have Git installed or you don't like using the terminal then you can download the [zip](###) and extract that and open the extracted folder in the code editor of your your choice.

## Editing the Template 🔨

Go to `index.html` and fill your information. 

### Header

In all of the places where you're supposed to fill your information you'll find HTML comments. As shown below just replace what is already in the opening and closing tags below the comment with your information.

```html
<div class="header__text-box row">
    <div class="header__text">
        <h1 class="heading-primary">
        <!-- Replace the following name with your name -->
        <span>Salim Jacuru</span>
        </h1>
        <!-- Put a small paragraph about yourself -->
        <p>A Master Software Engineer in New Zealand.</p>
        <a href="#contact" class="btn btn--pink">Get in touch</a>
    </div>
</div>
```

### Work Section

Each div with class `work__box` represents a project, replace the contents of the all the tags with the information of your projects.

```html
<div class="work__box">
    <div class="work__text">
    <h3>Portfolio Template</h3>
    <p>
        A free Open Source Portfolio for anyone to use for free.
    </p>
    <ul class="work__list">
        <li>Python</li>
    </ul>

    <div class="work__links">
        <a href="#" class="link__text">
        Visit Site <span>&rarr;</span>
        </a> 
        <a href="https://sjacuru.github.io/github-portfolio/" target="_blank">
        <img src="./images/github.svg" class="work__code" alt="GitHub">
        </a>
    </div>
    </div>
    <div class="work__image-box">
        <img
            src="./images/project-1.png"
            class="work__image"
            alt="Project 1"
        />
    </div>
</div>
```

For changing the screenshot:
- first place the image in `images/` folder and then in HTML replace the name in `src` with the name of your image.

- Recommended size for project image (1366 x 767px) also make sure the size of all  project images is the same.

```html
<img
    src="./images/name-of-your-image.png"
    class="work__image"
    alt="Project 1"
/>
```

### Clients Section

- Place the logos of the clients and companies that you have worked with in `images/` directory and then replace the name in `src` with the name of your logos accordingly.

- Make sure that you don't have whitespace on either side of the logos.

```html
<img
    src="./images/your-logo.png"
    class="client__logo"
    alt="Your Logo"
/>
```

### About Section

- Replace the contents in the below paragraph with information about yourself.
- Place a nice photo of yourself in the `images/` directory and then change the name in the src with your image name.

```html
<section class="about" id="about">
    <div class="row">
        <h2>About Me</h2>
        <div class="about__content">
            <div class="about__text">
                <!-- Replace the below paragraph with info about yourself -->
                <p>
                Aprendendo tecnologia baseada em IA. 
                </p>
                <!-- Provide a link to your resume -->
                <a href="#" class="btn">My Resume</a>
            </div>

            <div class="about__photo-container">
                <!-- Add a nice photo of yourself -->
                <img
                class="about__photo"
                src="./images/salim.jpg"
                alt=""
                />
            </div>
        </div>
    </div>
</section>
```

### Contact Section

- Modify the paragraph to your likings.
- Replace the email with yours in the `href` anchor property and the text also.

```html
<section class="contact" id="contact">
      <div class="row">
        <h2>Get in Touch</h2>
        <div class="contact__info">
          <p>
            Are you looking for someone who is really engaged in making things work? Someone 
            who tries to get it right from the start? Someone who never gives up? 
            
            You've found them!

          </p>
          <!-- Replace the email with yours -->
          <a href="mailto:sjacuru@gmail.com" class="btn">sjacuru@gmail.com</a>
        </div>
      </div>
</section>
```

### Footer

- Replace the `href` attribute values to your profile URLs for all anchors.
- Remove the div with class `footer__github-buttons`.

```html
<footer role="contentinfo" class="footer">
    <div class="row">
        <!-- Update the links to point to your accounts -->
        <ul class="footer__social-links">
            
            <li class="footer__social-link-item">
                <a href="https://sjacuru.github.io/github-portfolio/">
                    <img src="./images/github.svg" class="footer__social-image" alt="Github">
                </a>
            </li>
            <li class="footer__social-link-item">
                <a href="www.linkedin.com/in/salim-jacuru-87859a76/">
                    <img src="./images/linkedin.svg" class="footer__social-image" alt="Linkedin">
                </a>
            </li>
        </ul>

        <!-- If you give me some credit by keeping the below paragraph, will be huge for me 😊 Thanks. -->
        
        <div class="footer__github-buttons">
          <iframe
            src="www.linkedin.com/in/salim-jacuru-87859a76" 
            frameborder="0" scrolling="0" width="170" height="20" title="Watch Portfolio Template on GitHub">
          </iframe>
        </div>
    </div>
</footer>
```
=======
# Assessment_2_PSE_Bakery
Bakery Project Emam and Salim

🧁 Bakery Management System (Production to Sales)
A full-stack application designed to streamline and automate the entire operational workflow of a modern bakery, from raw material inventory to final sales reporting.

🌟 Project Overview
The Bakery Management System is a mission-critical application intended to replace manual, error-prone processes within a bakery's daily operations. By creating a unified platform, we aim to deliver a solution that ensures data integrity, increases operational efficiency, and provides real-time visibility across the business. 

Development Approach (Minimum Viable Product - MVP)

Our initial focus will be on developing the Minimum Viable Product (MVP), prioritizing the most essential features required for core functionality. The system is designed to be fully scalable and will be incremented with new features over time based on business needs and user feedback.

This system covers five core functional areas:

Raw Material Inventory Management: Tracking stock levels, usage, and reorder points for all ingredients.

Daily Production Tracking: Managing recipes, scheduling batches, and recording daily output.

Sales Monitoring: Processing transactions and tracking sales data.

Dashboard: Display live item tracking and provide a basic analysis report. 

Docker: version control and system demonstrations.

Reporting & Analytics: Generating key reports on costs and profitability. 

Django models are the source of truth; to apply migrations run "docker compose exec web python manage.py migrate". The manage.py shouldn`t be 
moved to the Django folde (bms_project), under the risk of breaking migrations processess.

👥 Team & Collaboration
This project is a collaborative effort between students and is being overseen by our professor, Mohammad.
Role            Name                  
Collaborator    Emam        
Collaborator    Salim       
Professor       Mohammad    
>>>>>>> 7043612f8032cb8ba3147f372122c6797c7d9755
