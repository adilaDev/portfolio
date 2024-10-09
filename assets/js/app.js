document.addEventListener("DOMContentLoaded", function () {
    // Load default content (English)
    loadContent("en");
});

$(".mean-nav .nav_scroll li a").on("click", closeMenu);

function closeMenu(e){
    const btnClose = $(".meanclose");
    var valid1 = (!$(e.currentTarget).hasClass("mean-expand"));
    // console.log("closeMenu: ", $(e.currentTarget).attr("class"));
    // console.log("valid 1: ", valid1);

    if (btnClose.length > 0 && valid1) {
        btnClose.click();
    }
}

// Event listener for language change
function changeLang(lang) {
    const selectLang = $(".selectLanguage");
    selectLang.toggleClass("active");

    console.clear();
    // console.log("onChange: ", lang);
    // console.log("selectLang: ", selectLang);
    // console.log("==============================");
    loadContent(lang);
}

let isLoadSkill = false;

// Function to load JSON based on language
function loadContent(language) {
    const d = new Date();
    const jsonFile = language === "en" ? "assets/db/data_portofolio_en.json?v="+d.getTime() : "assets/db/data_portofolio.json?v="+d.getTime();
    // console.log("loadContent: ", language);
    // console.log("jsonFile: ", jsonFile);

    fetch(jsonFile).then(response => response.json())
        .then(data => {
            console.log("dataJSON", language,": ", data);
            console.log("==============================");
            // Update content dynamically
            updateProfil(data.home, language);
            updateAbout(data.about_me, language);
            if (!isLoadSkill) {
                updateSkill(data.skill, language);
            }
            updateExperience(data.pengalaman_kerja, language);
            updateSchool(data.pendidikan, language);
            updateProject(data.proyek, language);
            // updateContact(data.kontak, language);

            $(function () {
                scrollCue.init({
                    duration: 1000,
                    interval: -0.7,
                    percentage: 0.90,
                    smartSpeed: 600
                });
            });
        })
        .catch(error => console.error('Error loading JSON:', error));
}

function updateProfil(data, lang){
    const nama = document.getElementById("name");
    const deskripsi = document.getElementById("deskripsi");
    const my_sosmed = document.getElementById("my_sosmed");
    nama.innerHTML = data.nama;
    deskripsi.innerHTML = data.deskripsi;
    my_sosmed.innerHTML = (lang == "en") ? "My Social Media" : "Media Sosial Saya";
    
    console.log("updateProfil: ", data);
    console.log("==============================");
}

function updateAbout(data) {
    const fullname = document.getElementById("fullname");
    const nickname = document.getElementById("nickname");
    const birthday = document.getElementById("birthday");
    const number = document.getElementById("number");
    const email = document.getElementById("email");
    const about_desc = document.getElementById("about_desc");
    const download_cv = document.getElementById("download_cv");

    fullname.innerHTML = ":&nbsp;&nbsp;"+data.fullname;
    nickname.innerHTML = ":&nbsp;&nbsp;"+data.nickname;
    birthday.innerHTML = ":&nbsp;&nbsp;"+data.birthday;
    number.innerHTML = ":&nbsp;&nbsp;"+data.number;
    email.innerHTML = ":&nbsp;&nbsp;"+data.email;
    about_desc.innerHTML = data.deskripsi;
    download_cv.setAttribute("href", data.download_cv);

    console.log("updateAbout: ", data);
    console.log("==============================");
}

function updateSkill(data) {
    isLoadSkill = true;
    const mySkill = document.getElementById("dynamic_skill");
    data.forEach(function(obj, i){
        const nama = obj.nama;
        const icon = obj.icon;
        const items = obj.items;
        // console.log("obj: ", i, nama);
        let colChild = '';
        items.forEach(function (v, idx) {
            // console.log("item: ", v, idx);
            let combineId = i + "_" + idx;
            colChild += `<span class="prosses-bar">${v.nama}</span>
                            <div id="${combineId}" class="barfiller">
                                <div class="tipWrap">
                                    <span class="tip"></span>
                                </div>
                                <span class="fill my-class" data-percentage="${v.persentase}"></span>
                            </div>`;
        });
        let colParent = `<div class="col-lg-6">
                    <div class="single-skill-box" data-cues="rotateIn">
                        <div class="section-title" data-cues="rotateIn">
                            <div class="sub-title">
                                <h3><i class="${icon}" style="margin-right: 10px;"></i></h3>
                                <h5>${nama}</h5>
                            </div>
                        </div>
                        <div class="col-lg-12 col-md-12 col-sm-12">
                            <div class="prossess-ber-plugin">
                                ${colChild}
                            </div>
                        </div>
                    </div>
                </div>`;
        mySkill.innerHTML += colParent;
    });

    // inisialisasi animate bar
    var barfiller = $(".barfiller");
    if (barfiller.length > 0) {
        for (let i = 0; i < barfiller.length; i++) {
            const el = barfiller[i];
            var id = $(el).attr("id");
            animateBar('#' + id, 3000);
        }
    }
    
    console.log("updateSkill: ", data);
    console.log("==============================");
}

function animateBar(id, durations = 3000){
    // console.log("animateBar: ", id);
    $(id).barfiller({
        duration: durations
    });
}

function updateExperience(data, lang) {
    const id1 = document.getElementById("titleWork1");
    const id2 = document.getElementById("titleWork2");
    const id3 = document.getElementById("titleWork3");

    const date1 = document.getElementById("dateWork1");
    const date2 = document.getElementById("dateWork2");
    const date3 = document.getElementById("dateWork3");
    
    const listTitle = [id1, id2, id3];
    const listDate = [date1, date2, date3];
    const listPosisi = [document.createElement("p"), document.createElement("p"), document.createElement("p")];
    const listDesc = [document.createElement("p"), document.createElement("p"), document.createElement("p")];

    for (let i = 0; i < data.length; i++) {
        const item = data[i];
        const nama = item.nama_perusahaan;
        const job_desc = item.job_desc;
        const posisi = item.posisi;
        const date = item.tahun;

        listTitle[i].innerText = nama;
        listDate[i].innerText = date;
        
        var no = i+1;
        const content = document.getElementById("contentWork" + no);
        content.innerHTML = "";

        var lang_pos = (lang == "en") ? "Position" : "Posisi";
        var lang_des = (lang == "en") ? "Job Description" : "Deskripsi Pekerjaan";

        listPosisi[i].innerHTML = "<strong>" + lang_pos+ " : </strong> " + posisi;
        listDesc[i].innerHTML = "<strong>" + lang_des + " :</strong> " + job_desc;

        content.append(listPosisi[i]);
        content.append(listDesc[i]);
    }
    console.log("updateExperience: ", data);
    console.log("==============================");
}

function updateSchool(data, lang) {
    const id1 = document.getElementById("titleSchool1");
    const id2 = document.getElementById("titleSchool2");
    const id3 = document.getElementById("titleSchool3");

    const date1 = document.getElementById("dateSchool1");
    const date2 = document.getElementById("dateSchool2");
    const date3 = document.getElementById("dateSchool3");

    const listTitle = [id1, id2, id3];
    const listDate = [date1, date2, date3];
    const listPosisi = [document.createElement("p"), document.createElement("p"), document.createElement("p")];

    for (let i = 0; i < data.length; i++) {
        const item = data[i];
        const nama = item.nama_sekolah;
        const posisi = item.jurusan;
        const date = item.tahun;

        listTitle[i].innerText = nama;
        listDate[i].innerText = date;

        var no = i + 1;
        const content = document.getElementById("contentSchool" + no);
        content.innerHTML = "";

        var lang_major = (lang == "en") ? "Major" : "Jurusan";
        listPosisi[i].innerHTML = (posisi != "") ? "<strong>" + lang_major + " :</strong> " + posisi : "<strong>" + lang_major + " :</strong> -";
        content.append(listPosisi[i]);
    }
    console.log("updateSchool: ", data);
    console.log("==============================");
}

function updateProject(data) {
    var parentElement = $(".image_load");
    parentElement.html(null);
    var childParent = parentElement.children();
    console.log("parentElement: ", parentElement.length, parentElement);
    console.log("childParent: ", childParent.length, childParent);
    
    for (let i = 0; i < data.length; i++) {
        const item = data[i];
        let img = item.images;
        let nama = item.project_name;
        let start_date = item.start_date;
        let end_date = item.end_date;
        var tempPorto = `<div class="col-lg-4 col-md-6 col-sm-12 grid-item physics cemes">
				<div class="single_portfolio" data-cues="rotateIn">
					<div class="single_portfolio_thumb">
						<img src="${img}" alt="" />
						<div class="single_portfolio_content">
							<span>${start_date} s/d ${end_date}</span>
							<h3><a href="portfolio-details.html?project=${nama}">${nama}</a></h3>
						</div>
					</div>
				</div>
			</div>`;
        parentElement.append(tempPorto);
    }
    console.log("updateProject: ", data);
    console.log("==============================");
}

function updateContact(data) {
    console.log("updateContact: ", data);
    console.log("==============================");
}