<
        document.addEventListener("DOMContentLoaded", () => {
            
            // XOGTA RIGGIGA AH (MOCK DATA) - Haddii localStorage uu maran yahay si uusan boggu u madoobaan
            const defaultStudent = {
                name: "Fatima Hassan",
                id: "STU-2025-0001",
                class: "Grade 8",
                attendance: "92%",
                rank: "#1",
                grades: [
                    { subject: "Mathematics", ca: 34, exam: 52 },
                    { subject: "English Language", ca: 30, exam: 48 },
                    { subject: "Science & Tech", ca: 32, exam: 45 },
                    { subject: "History & Social", ca: 28, exam: 50 }
                ]
            };

            // 1. AQOONSIGA ARDAYGA (LOCALSTORAGE CHECK)
            let currentStudent = JSON.parse(localStorage.getItem("currentUser"));
            
            // Haddii uu qofku si toos ah u soo qortay URL-ka isagoon soo login, waxaan halkan u dhigaynaa xogtii tusaalaha si aad u aragto quruxda boga
            if (!currentStudent || currentStudent.role !== 'student') {
                currentStudent = defaultStudent; 
            }

            // 2. KOOFI-GARAYNTA XOGTA ARDAYGA EE SHAASHADDA
            document.getElementById("top-welcome-name").textContent = `Ku dhowaan, ${currentStudent.name}`;
            document.getElementById("welcome-student-name").textContent = currentStudent.name;
            document.getElementById("student-id-display").textContent = `${currentStudent.id} · ${currentStudent.class}`;
            
            // Kaadhadhka Kore
            document.getElementById("card-class").textContent = currentStudent.class;
            document.getElementById("card-attendance").textContent = currentStudent.attendance || "92%";
            document.getElementById("card-rank").textContent = currentStudent.rank || "#1";

            // Sameynta Astaanta Avatar-ka (Xarfaha hore ee magaca - Tusaale: Fatima Hassan -> FH)
            const initials = currentStudent.name.split(' ').map(n => n[0]).join('').toUpperCase();
            document.getElementById("profile-avatar").textContent = initials.substring(0, 2);
            document.getElementById("big-avatar").textContent = initials.substring(0, 2);

            // Geli Taariikhda Maanta
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            document.getElementById("current-date-box").textContent = new Date().toLocaleDateString('en-US', options);

            // 3. XISAABINTA DIGIT-KA AH OO SOO BIXINTA SHAXDA (DYNAMIC GRADES)
            const tableBody = document.getElementById("grades-table-body");
            let totalSum = 0;
            const subjectsList = currentStudent.grades || defaultStudent.grades;

            tableBody.innerHTML = ""; // Nadiifi meesha marka hore

            subjectsList.forEach(item => {
                const total = item.ca + item.exam;
                totalSum += total;

                // Xisaabi Darajada (Grade)
                let grade = "F";
                if (total >= 85) grade = "A";
                else if (total >= 75) grade = "B";
                else if (total >= 60) grade = "C";
                else if (total >= 50) grade = "D";

                // Xaaladda Baasay/Dhacay
                const remark = total >= 50 ? "Passed" : "Failed";
                const remarkClass = total >= 50 ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600";
                const totalClass = total >= 80 ? "text-emerald-600" : "text-slate-700";

                const row = `
                    <tr class="hover:bg-slate-50/80 transition-colors">
                        <td class="py-3.5 px-6 font-semibold text-slate-700">${item.subject}</td>
                        <td class="py-3.5 px-4 text-slate-500">${item.ca}</td>
                        <td class="py-3.5 px-4 text-slate-500">${item.exam}</td>
                        <td class="py-3.5 px-4 font-bold ${totalClass}">${total}</td>
                        <td class="py-3.5 px-4"><span class="font-bold text-slate-700">${grade}</span></td>
                        <td class="py-3.5 px-6 text-right">
                            <span class="inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-semibold ${remarkClass}">
                                ${remark}
                            </span>
                        </td>
                    </tr>
                    
                    <script>
                `;
                tableBody.innerHTML += row;
            });

            // Xisaabi Celceliska dhabta ah (Average)
            const avg = (totalSum / subjectsList.length).toFixed(1);
            document.getElementById("card-average").textContent = avg;


            // 4. MAAREYNTA SIDEBAR-KA IYO NAVIGATION-KA
            const sidebarLinks = document.querySelectorAll(".sidebar-link");
            const sections = document.querySelectorAll(".dashboard-section");
            const profileMenuBtn = document.getElementById("profile-menu-btn");
            const profileDropdown = document.getElementById("profile-dropdown");
            
            // Mobile Buttons
            const menuToggleBtn = document.getElementById("menu-toggle-btn");
            const sidebar = document.getElementById("sidebar");
            const overlay = document.getElementById("sidebar-overlay");

            // Kala beddelka bogagga
            sidebarLinks.forEach(link => {
                link.addEventListener("click", function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute("data-target");
                    if (!targetId) return;

                    sections.forEach(sec => {
                        if (sec.id === targetId) sec.classList.remove("hidden");
                        else sec.classList.add("hidden");
                    });

                    sidebarLinks.forEach(item => {
                        item.classList.remove("bg-indigo-900", "text-white");
                        item.classList.add("text-indigo-200", "hover:bg-indigo-900/50");
                    });

                    this.classList.add("bg-indigo-900", "text-white");
                    this.classList.remove("text-indigo-200", "hover:bg-indigo-900/50");

                    // Xir menu-ga Mobile-ka marka link la gujiyo
                    sidebar.classList.add("sidebar-closed");
                    sidebar.classList.remove("sidebar-open");
                    overlay.classList.add("hidden");
                });
            });

            // Maamulka Sidebar-ka Mobile-ka
            if(menuToggleBtn && sidebar && overlay) {
                menuToggleBtn.addEventListener("click", () => {
                    sidebar.classList.remove("sidebar-closed");
                    sidebar.classList.add("sidebar-open");
                    overlay.classList.remove("hidden");
                });

                overlay.addEventListener("click", () => {
                    sidebar.classList.add("sidebar-closed");
                    sidebar.classList.remove("sidebar-open");
                    overlay.classList.add("hidden");
                });
            }

            // Profile Dropdown Open/Close
            if (profileMenuBtn && profileDropdown) {
                profileMenuBtn.addEventListener("click", (e) => {
                    e.stopPropagation();
                    profileDropdown.classList.toggle("hidden");
                });
                document.addEventListener("click", () => {
                    profileDropdown.classList.add("hidden");
                });
            }

            // 5. BADHANKA KA BAX (LOGOUT ACTION)
            const logoutActions = document.querySelectorAll(".logout-action");
            logoutActions.forEach(action => {
                action.addEventListener("click", (e) => {
                    e.preventDefault();
                    const xaqiijin = confirm("Ma hubaal maysaa inaad ka baxayso nidaamka ardayga?");
                    if (xaqiijin) {
                        localStorage.removeItem("currentUser");
                        window.location.replace("log_in.html"); // U celi boga login-ka dhabta ah
                    }
                });
            });

        });
    </script>