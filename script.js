// Function to calculate age
function calculateAge(dob, compareDate = new Date()) {
    const birthDate = new Date(dob);
    const currentDate = new Date(compareDate);

    if (currentDate < birthDate) {
        alert("Compare date cannot be earlier than your Date of Birth.");
        return null;
    }

    let ageYears = currentDate.getFullYear() - birthDate.getFullYear();
    let ageMonths = currentDate.getMonth() - birthDate.getMonth();
    let ageDays = currentDate.getDate() - birthDate.getDate();

    if (ageMonths < 0 || (ageMonths === 0 && ageDays < 0)) {
        ageYears--;
        ageMonths += 12;
    }
    
    if (ageDays < 0) {
        const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
        ageDays += daysInMonth;
        ageMonths--;
    }

    return { years: ageYears, months: ageMonths, days: ageDays };
}

// Function to get Zodiac sign
function getZodiacSign(dob) {
    const birthDate = new Date(dob);
    const day = birthDate.getDate();
    const month = birthDate.getMonth() + 1;  // JavaScript months are 0-based

    console.log(`Month: ${month}, Day: ${day}`);  // Debugging output

    const zodiacSigns = [
        { sign: "Capricorn", startDate: { day: 22, month: 12 }, endDate: { day: 19, month: 1 } },
        { sign: "Aquarius", startDate: { day: 20, month: 1 }, endDate: { day: 18, month: 2 } },
        { sign: "Pisces", startDate: { day: 19, month: 2 }, endDate: { day: 20, month: 3 } },
        { sign: "Aries", startDate: { day: 21, month: 3 }, endDate: { day: 19, month: 4 } },
        { sign: "Taurus", startDate: { day: 20, month: 4 }, endDate: { day: 20, month: 5 } },
        { sign: "Gemini", startDate: { day: 21, month: 5 }, endDate: { day: 20, month: 6 } },
        { sign: "Cancer", startDate: { day: 21, month: 6 }, endDate: { day: 22, month: 7 } },
        { sign: "Leo", startDate: { day: 23, month: 7 }, endDate: { day: 22, month: 8 } },
        { sign: "Virgo", startDate: { day: 23, month: 8 }, endDate: { day: 22, month: 9 } },
        { sign: "Libra", startDate: { day: 23, month: 9 }, endDate: { day: 22, month: 10 } },
        { sign: "Scorpio", startDate: { day: 23, month: 10 }, endDate: { day: 21, month: 11 } },
        { sign: "Sagittarius", startDate: { day: 22, month: 11 }, endDate: { day: 21, month: 12 } },
    ];

    for (const zodiac of zodiacSigns) {
        if (
            (month === zodiac.startDate.month && day >= zodiac.startDate.day) ||
            (month === zodiac.endDate.month && day <= zodiac.endDate.day) ||
            (month > zodiac.startDate.month && month < zodiac.endDate.month) ||
            (month === zodiac.endDate.month && day <= zodiac.endDate.day)
        ) {
            return zodiac.sign;
        }
    }

    return "Unknown";
}

// Function to update video based on age
function updateVideoByAge(age) {
    const videoElement = document.getElementById('age-video');
    videoElement.pause();
    videoElement.classList.add('hidden');

    setTimeout(() => {
        if (age.years <= 12) {
            videoElement.src = 'videos/child-animation.mp4';
        } else if (age.years <= 19) {
            videoElement.src = 'videos/teenager-animation.mp4';
        } else if (age.years <= 60) {
            videoElement.src = 'videos/adult-animation.mp4';
        } else {
            videoElement.src = 'videos/senior-animation.mp4';
        }

        videoElement.load();
        videoElement.play();
        videoElement.classList.remove('hidden');
    }, 500);  // Adjust this delay based on the CSS transition
}

// Event listener for button click
document.getElementById('calculate-btn').addEventListener('click', function() {
    const dob = document.getElementById('dob').value;
    const compareDate = document.getElementById('compare-date').value || new Date();

    if (!dob) {
        alert("Please enter your Date of Birth");
        return;
    }

    const age = calculateAge(dob, compareDate);

    if (age) {  // Ensure age calculation was successful
        const zodiac = getZodiacSign(dob);
        console.log(`Zodiac sign: ${zodiac}`);  // Debugging output

        document.getElementById('age-result').textContent = `You are ${age.years} years, ${age.months} months, and ${age.days} days old.`;
        document.getElementById('zodiac-result').textContent = `Your Zodiac sign is ${zodiac}.`;

        updateVideoByAge(age);
    }
});
