document.addEventListener("DOMContentLoaded", () => {
    
    const sidebarLinks = document.querySelectorAll(".sidebar-link");
    const sections = document.querySelectorAll(".dashboard-section");
    const profileMenuBtn = document.getElementById("profile-menu-btn");
    const profileDropdown = document.getElementById("profile-dropdown");

    // 1. KALA-BEDDELKA BOGAGGA (NAVIGATION)
    sidebarLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();

            const targetSectionId = this.getAttribute("data-target");
            if (!targetSectionId) return;

            sections.forEach(section => {
                if (section.id === targetSectionId) {
                    section.classList.remove("hidden");
                } else {
                    section.classList.add("hidden");
                }
            });

            sidebarLinks.forEach(item => {
                item.classList.remove("bg-emerald-800", "text-white");
                item.classList.add("text-emerald-200", "hover:bg-emerald-800");
            });

            if(this.classList.contains('px-4')) {
                this.classList.add("bg-emerald-800", "text-white");
                this.classList.remove("text-emerald-200", "hover:bg-emerald-800");
            }

            if (profileDropdown) {
                profileDropdown.classList.add("hidden");
            }
        });
    });

    // 2. MAAREYNTA DROPDOWN-KA PROFAYLKA
    if (profileMenuBtn && profileDropdown) {
        profileMenuBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            profileDropdown.classList.toggle("hidden");
        });

        document.addEventListener("click", () => {
            profileDropdown.classList.add("hidden");
        });
    }

    // 3. BADHANKA KA BAX (LOGOUT ACTION)
    const logoutActions = document.querySelectorAll(".logout-action");
    logoutActions.forEach(action => {
        action.addEventListener("click", (e) => {
            e.preventDefault();
            const xaqiijin = confirm("Ma hubaal maysaa inaad ka baxayso nidaamka?");
            if (xaqiijin) {
                localStorage.removeItem("currentUser");
                window.location.replace("log_in.html");
            }
        });
    });

    // 4. MAAREYNTA DHIBCAHA (FORM SUBMIT & AUTOMATIC CALCULATION)
    const marksForm = document.getElementById("marks-form");
    const marksTableContainer = document.getElementById("marks-table-container");
    const marksTbody = document.getElementById("marks-tbody");

    let studentsSample = [
        { name: "Axmed Maxamed Cali", score: 85 },
        { name: "Faadumo Cumar Xasan", score: 92 },
        { name: "Yasin Jaamac Cilmi", score: 64 }
    ];

    if (marksForm) {
        marksForm.addEventListener("submit", (e) => {
            e.preventDefault();
            renderMarksTable();
        });
    }

    function renderMarksTable() {
        if(!marksTbody) return;
        marksTbody.innerHTML = "";
        
        let sortedStudents = [...studentsSample].sort((a, b) => b.score - a.score);
        
        studentsSample.forEach((student) => {
            let percentage = student.score; 
            let average = student.score; 
            let rank = sortedStudents.findIndex(s => s.score === student.score) + 1;

            let row = `
                <tr class="border-b hover:bg-gray-50">
                    <td class="p-3 font-medium">${student.name}</td>
                    <td class="p-3 text-center">
                        <input type="number" class="student-score-input w-20 border text-center p-1 rounded bg-white" value="${student.score}" disabled data-name="${student.name}">
                    </td>
                    <td class="p-3 text-center text-emerald-600 font-bold">${percentage}%</td>
                    <td class="p-3 text-center font-medium">${average}</td>
                    <td class="p-3 text-center"><span class="bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full text-xs font-bold">Kaalinta ${rank}aad</span></td>
                </tr>
            `;
            marksTbody.innerHTML += row;
        });

        marksTableContainer.classList.remove("hidden");
    }

    // 5. IMPORT-KA IYO EDIT-KA DHIBCAHA
    const importInput = document.getElementById("import-marks-file");
    const btnEditMarks = document.getElementById("btn-edit-marks");

    if(importInput) {
        importInput.addEventListener("change", (e) => {
            if(e.target.files.length > 0) {
                alert(`Xogta natiijada ee faylka "${e.target.files[0].name}" waa la akhriyay!`);
                renderMarksTable();
            }
        });
    }

    if(btnEditMarks) {
        btnEditMarks.addEventListener("click", () => {
            const inputs = document.querySelectorAll(".student-score-input");
            if(inputs.length === 0) {
                alert("Fadlan marka hore guji 'Fur Liiska Ardayda' si aad dhibcaha u aragto!");
                return;
            }
            
            inputs.forEach(input => {
                input.disabled = !input.disabled;
                if(!input.disabled) {
                    input.classList.add("border-blue-500", "ring-2", "ring-blue-200");
                } else {
                    input.classList.remove("border-blue-500", "ring-2", "ring-blue-200");
                    let updatedName = input.getAttribute("data-name");
                    let targetStudent = studentsSample.find(s => s.name === updatedName);
                    if(targetStudent) targetStudent.score = parseInt(input.value) || 0;
                }
            });

            if(!inputs[0].disabled) {
                btnEditMarks.innerHTML = `<i class="fa-solid fa-check"></i> <span>Xaqiiji Edit-ka</span>`;
                btnEditMarks.classList.replace("bg-blue-50", "bg-amber-50");
                btnEditMarks.classList.replace("text-blue-700", "text-amber-700");
            } else {
                btnEditMarks.innerHTML = `<i class="fa-solid fa-user-gear"></i> <span>Edit Natiijo</span>`;
                btnEditMarks.classList.replace("bg-amber-50", "bg-blue-50");
                btnEditMarks.classList.replace("text-amber-700", "text-blue-700");
                renderMarksTable();
            }
        });
    }

    // ==========================================
    // 🌟 6. SHIQLKA XAADIRINTA CUSUB (ATTENDANCE LOGIC WITH EXCUSED)
    // ==========================================
    const classCards = document.querySelectorAll(".class-card");
    const classesGridContainer = document.getElementById("classes-grid-container");
    const attendanceSheetContainer = document.getElementById("attendance-sheet-container");
    const dynamicTbody = document.getElementById("attendance-dynamic-tbody");
    const btnBackToClasses = document.getElementById("btn-back-to-classes");

    const studentsList = [
        { name: "Fatima Hassan" },
        { name: "Abdi Warsame" },
        { name: "Hibo Mohamed" }
    ];

    classCards.forEach(card => {
        card.addEventListener("click", function() {
            const className = this.getAttribute("data-classname");
            
            if(document.getElementById("active-class-title")) {
                document.getElementById("active-class-title").textContent = `Attendance Sheet - ${className}`;
            }

            if (dynamicTbody) {
                dynamicTbody.innerHTML = ""; 
                studentsList.forEach((student, index) => {
                    let row = `
                        <tr class="attendance-row-dynamic">
                            <td class="py-4 font-medium text-gray-400">0${index + 1}</td>
                            <td class="py-4">
                                <span class="font-semibold text-gray-800">${student.name}</span>
                            </td>
                            <td class="py-4 text-right pr-4">
                                <div class="inline-flex rounded-lg p-0.5 bg-gray-100 text-xs font-semibold">
                                    <button type="button" class="btn-status-dynamic px-3 py-1.5 rounded-md text-gray-400" data-status="Present">Present</button>
                                    <button type="button" class="btn-status-dynamic px-3 py-1.5 rounded-md text-gray-400" data-status="Absent">Absent</button>
                                    <button type="button" class="btn-status-dynamic px-3 py-1.5 rounded-md text-gray-400" data-status="Excused">Excused</button>
                                </div>
                            </td>
                        </tr>
                    `;
                    dynamicTbody.innerHTML += row;
                });

                initAttendanceToggle();
            }

            if(classesGridContainer && attendanceSheetContainer) {
                classesGridContainer.classList.add("hidden");
                attendanceSheetContainer.classList.remove("hidden");
            }
        });
    });

    if (btnBackToClasses) {
        btnBackToClasses.addEventListener("click", () => {
            if(classesGridContainer && attendanceSheetContainer) {
                classesGridContainer.classList.remove("hidden");
                attendanceSheetContainer.classList.add("hidden");
            }
        });
    }

    function initAttendanceToggle() {
        const rows = document.querySelectorAll(".attendance-row-dynamic");
        rows.forEach(row => {
            const buttons = row.querySelectorAll(".btn-status-dynamic");
            buttons.forEach(btn => {
                btn.addEventListener("click", function() {
                    buttons.forEach(b => b.classList.remove("bg-white", "shadow-sm", "text-emerald-600", "text-red-600", "text-amber-600"));
                    
                    const status = this.getAttribute("data-status");
                    if(status === "Present") {
                        this.classList.add("bg-white", "shadow-sm", "text-emerald-600");
                    } else if(status === "Absent") {
                        this.classList.add("bg-white", "shadow-sm", "text-red-600");
                    } else if(status === "Excused") {
                        this.classList.add("bg-white", "shadow-sm", "text-amber-600");
                    }
                });
            });
        });
    }

    sidebarLinks.forEach(link => {
        link.addEventListener("click", function() {
            if(this.getAttribute("data-target") === "xaadirinta-section") {
                if(classesGridContainer && attendanceSheetContainer) {
                    classesGridContainer.classList.remove("hidden");
                    attendanceSheetContainer.classList.add("hidden");
                }
            }
        });
    });

});