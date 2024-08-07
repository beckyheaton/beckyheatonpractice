document.addEventListener("DOMContentLoaded", () => {
    // Function to get the current time in Sydney
    function getSydneyTime() {
        const sydneyOffset = 10 * 60; // Sydney is GMT+10
        const now = new Date();
        const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
        const sydneyTime = new Date(utc + (sydneyOffset * 60000));
        return sydneyTime;
    }

    // Function to change background color based on time of day with gradient
    function changeBackgroundColor(customTime = null) {
        const now = customTime !== null ? customTime : getSydneyTime();
        const hour = now.getHours();
        const minutes = now.getMinutes();
        const totalMinutes = hour * 60 + minutes;

        let color1, color2, headerColor, startTime, endTime;

        if (hour >= 5 && hour < 7) {
            color1 = 'rgb(186, 167, 204)'; // Early Morning color
            color2 = 'rgb(156, 197, 230)'; // Morning color
            headerColor = '#6d9fa1'; // Header color for Early Morning
            startTime = 5 * 60; // 5:00 AM
            endTime = 7 * 60; // 7:00 AM
        } else if (hour >= 7 && hour < 16) {
            color1 = 'rgb(156, 197, 230)'; // Morning color
            color2 = 'rgb(216, 190, 189)'; // Afternoon color
            headerColor = '#633a19'; // Header color for Morning
            startTime = 7 * 60; // 7:00 AM
            endTime = 16 * 60; // 4:00 PM
        } else if (hour >= 16 && hour < 18) {
            color1 = 'rgb(216, 190, 189)'; // Afternoon color
            color2 = 'rgb(0, 73, 109)'; // Evening color
            headerColor = '#274142'; // Header color for Afternoon
            startTime = 16 * 60; // 4:00 PM
            endTime = 18 * 60; // 6:00 PM
        } else if (hour >= 18 && hour < 21) {
            color1 = 'rgb(0, 73, 109)'; // Evening color
            color2 = 'rgb(20, 32, 63)'; // Night color
            headerColor = '#ffb692'; // Header color for Evening
            startTime = 18 * 60; // 6:00 PM
            endTime = 21 * 60; // 9:00 PM
        } else if (hour >= 21 || hour < 4) {
            color1 = 'rgb(20, 32, 63)'; // Night color
            color2 = 'rgb(20, 32, 63)'; // Night color
            headerColor = '#557642'; // Header color for Night
            if (hour >= 21) {
                startTime = 21 * 60; // 9:00 PM
                endTime = 24 * 60 + 4 * 60; // 4:00 AM next day
            } else {
                startTime = 0; // Midnight
                endTime = 4 * 60; // 4:00 AM
            }
        } else if (hour >= 4 && hour < 5) {
            color1 = 'rgb(20, 32, 63)'; // Night color
            color2 = 'rgb(186, 167, 204)'; // Early Morning color
            headerColor = '#557642'; // Header color for Night transitioning to Early Morning
            startTime = 4 * 60; // 4:00 AM
            endTime = 5 * 60; // 5:00 AM
        }

        // Calculate the percentage position of the gradient transition
        const totalPeriodMinutes = endTime - startTime;
        const elapsedMinutes = totalMinutes - startTime;
        const transitionPercentage = (elapsedMinutes / totalPeriodMinutes) * 100;

        // Adjust gradient stops for smooth transition
        document.body.style.background = `linear-gradient(to bottom, ${color1}, ${color2})`;
        document.body.style.backgroundAttachment = 'fixed'; // Ensure the background covers the whole page

        // Change header color
        document.querySelector('header').style.color = headerColor;
    }

    // Call the function to change the background color with an optional custom time for testing
    changeBackgroundColor(); // Use this to see the actual time-based background
    //changeBackgroundColor(new Date('2023-07-25T05:30:00')); // Uncomment and set the time to test different times
});
