Introduction
This project aims to create a Simple News Notification System that enables users to receive email notifications for newly published news items and provides a user-friendly interface to view and interact with the news items. The system consists of a Laravel backend for managing news items and sending notifications, and a Next.js frontend for displaying news items to users.

Features
Backend (Laravel)
Email Notifications: Implemented a mechanism to send email notifications to users when a new news item is published.
Temporary Storage: Stored fetched news items temporarily for quick access in subsequent requests.
Daily Summary Email: Developed a daily routine to compile a summary of news items added that day and send it to a specified email address.
CRUD Operations: Created functionalities to handle operations like creating, updating, or deleting news items, with corresponding responses.
Frontend (Next.js)
News Item Interface: Designed a user interface to display a list of news items and allow users to view details of each item.
Temporary Storage Indicator: Included an indicator/message in the interface to show whether the news items are served from temporary storage.
Setup Instructions
Backend (Laravel)
Clone the repository: git clone <repository-url>
Navigate to the backend directory: cd backend
Install dependencies: composer install
Set up environment variables by copying .env.example to .env and configuring it.
Generate application key: php artisan key:generate
Migrate the database: php artisan migrate
Serve the application: php artisan serve
Frontend (Next.js)
Navigate to the frontend directory: cd frontend
Install dependencies: npm install
Set up environment variables by copying .env.example to .env and configuring it.
Run the development server: npm run dev
Usage
Access the backend API through the provided endpoints for CRUD operations on news items.
Access the frontend interface to view the list of news items and their details.
Users will receive email notifications for newly published news items and a daily summary of news items.
-----


Users Part

![image](https://github.com/sehersaygili/NotificationSystem/assets/77735385/4890d7a3-66a4-4754-8e55-26e902ddccd9)
![image](https://github.com/sehersaygili/NotificationSystem/assets/77735385/ee8897ba-cf23-49a5-8c9c-dfcc5ef7527a)


Admin Part

![image](https://github.com/sehersaygili/NotificationSystem/assets/77735385/50afb06d-1bf3-4395-994e-0530832388c4)
![image](https://github.com/sehersaygili/NotificationSystem/assets/77735385/f2d4e417-1298-4d60-ad41-93ad365c41a2)
![image](https://github.com/sehersaygili/NotificationSystem/assets/77735385/a1b4bc66-2a4c-426b-9a35-bba1a15d2d9c)
![image](https://github.com/sehersaygili/NotificationSystem/assets/77735385/910bb07f-838d-4a8a-90e4-c2f4444affd5)
![image](https://github.com/sehersaygili/NotificationSystem/assets/77735385/01b78978-afff-4b7a-9f0d-a80623c69612)




