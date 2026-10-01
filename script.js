/* =========================================================
   SWEETIE CLOUD
   SCRIPT.JS
========================================================= */


/* =========================================================
   DATA PESANAN
========================================================= */

let order = {
    customer: "",
    voucher: "",
    isReturningCustomer: false,

    cakeItems: [],

    subtotal: 0,
    discount: 0,
    tax: 0,
    total: 0
};


/* =========================================================
   CAKE YANG SEDANG DIPILIH
========================================================= */

let currentCake = {
    name: "Cloud Cupcake",
    price: 18000,
    type: "cupcake"
};


/* =========================================================
   CUSTOMIZATION DEFAULT
========================================================= */

let currentCustomization = {
    base: {
        name: "Vanilla",
        price: 0
    },

    fondant: {
        name: "Vanilla",
        price: 0
    },

    cream: {
        name: "Whipped Cream",
        price: 4000,
        type: "whipped"
    },

    decoration: {
        name: "Tanpa Hiasan",
        price: 0,
        type: "none"
    },

    packing: {
        name: "Pink",
        price: 3000
    }
};


/* =========================================================
   QUANTITY
========================================================= */

let currentQuantity = 1;

let remainingCakes = 0;


/* =========================================================
   SHOW PAGE
========================================================= */

function showPage(pageId) {

    const pages = document.querySelectorAll(".page");

    pages.forEach(function(page) {
        page.classList.remove("active");
    });


    const targetPage = document.getElementById(pageId);

    if (targetPage) {

        targetPage.classList.add("active");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    } else {

        console.error(
            "Halaman tidak ditemukan:",
            pageId
        );

    }
}


/* =========================================================
   LOGIN
========================================================= */

function loginCustomer() {

    const input = document.getElementById("customerName");


    if (!input) {

        alert("Input nama tidak ditemukan.");

        return;
    }


    const name = input.value.trim();


    if (name === "") {

        alert("Yuk isi nama kamu dulu 💗");

        input.focus();

        return;
    }


    order.customer = name;


    const customerKey =
        "sweetie_customer_" +
        name.toLowerCase();


    const savedCustomer =
        localStorage.getItem(customerKey);


    if (savedCustomer) {

        /*
         * CUSTOMER LAMA
         */

        try {

            const customerData =
                JSON.parse(savedCustomer);


            order.voucher =
                customerData.voucher;


            order.isReturningCustomer =
                customerData.hasPurchased === true;

        } catch (error) {

            /*
             * Kalau data lama masih berupa
             * voucher string dari versi sebelumnya
             */

            order.voucher =
                savedCustomer;

            order.isReturningCustomer =
                true;
        }


        showReturningCustomer();

    } else {

        /*
         * CUSTOMER BARU
         */

        order.voucher =
            generateVoucher();


        order.isReturningCustomer =
            false;


        showNewCustomer();

    }


    const menuCustomer =
        document.getElementById("menuCustomer");


    if (menuCustomer) {

        menuCustomer.innerText =
            name;

    }
}


/* =========================================================
   GENERATE VOUCHER
========================================================= */

function generateVoucher() {

    const number =
        Math.floor(
            1000 +
            Math.random() * 9000
        );


    return "SWEETIE" + number;
}


/* =========================================================
   CUSTOMER BARU
========================================================= */

function showNewCustomer() {

    const welcomeName =
        document.getElementById("welcomeName");


    const voucherText =
        document.getElementById("voucherText");


    const discountInfo =
        document.getElementById("discountInfo");


    if (welcomeName) {

        welcomeName.innerText =
            "Welcome, " +
            order.customer +
            "! 🎀";

    }


    if (voucherText) {

        voucherText.innerText =
            order.voucher;

    }


    if (discountInfo) {

        discountInfo.innerHTML =
            "🎀 Selamat datang di Sweetie Cloud!<br>" +
            "Kamu mendapatkan <b>voucher pelanggan baru</b> 💗";

    }


    showPage("voucherPage");
}


/* =========================================================
   CUSTOMER LAMA
========================================================= */

function showReturningCustomer() {

    const welcomeName =
        document.getElementById("welcomeName");


    const voucherText =
        document.getElementById("voucherText");


    const discountInfo =
        document.getElementById("discountInfo");


    if (welcomeName) {

        welcomeName.innerText =
            "Welcome back, " +
            order.customer +
            "! 💗";

    }


    if (voucherText) {

        voucherText.innerText =
            order.voucher;

    }


    if (discountInfo) {

        discountInfo.innerHTML =
            "💗 Sweetie Cloud mengenali kamu!<br>" +
            "Karena kamu sudah pernah membeli sebelumnya, " +
            "kamu mendapatkan <b>diskon 10%</b> untuk pesanan kali ini ✨";

    }


    showPage("voucherPage");
}


/* =========================================================
   MULAI BELANJA
========================================================= */

function startShopping() {

    const menuCustomer =
        document.getElementById("menuCustomer");


    if (menuCustomer) {

        menuCustomer.innerText =
            order.customer;

    }


    showPage("menuPage");
}


/* =========================================================
   PILIH CAKE
========================================================= */

function chooseCake(
    name,
    price,
    type
) {

    currentCake = {
        name: name,
        price: price,
        type: type
    };


    resetCustomization();


    const cakeName =
        document.getElementById("cakeName");


    if (cakeName) {

        cakeName.innerText =
            name;

    }


    updateCakePreview();

    updateCustomizationPrice();


    showPage("customPage");
}


/* =========================================================
   RESET CUSTOMIZATION
========================================================= */

function resetCustomization() {

    currentCustomization = {

        base: {
            name: "Vanilla",
            price: 0
        },

        fondant: {
            name: "Vanilla",
            price: 0
        },

        cream: {
            name: "Whipped Cream",
            price: 4000,
            type: "whipped"
        },

        decoration: {
            name: "Tanpa Hiasan",
            price: 0,
            type: "none"
        },

        packing: {
            name: "Pink",
            price: 3000
        }

    };


    currentQuantity = 1;


    const quantityValue =
        document.getElementById("quantityValue");


    if (quantityValue) {

        quantityValue.innerText = "1";

    }


    /*
     * Reset semua tombol selected
     */

    document
        .querySelectorAll(".round-option")
        .forEach(function(button) {

            button.classList.remove("selected");

        });


    /*
     * Tombol pertama di setiap section
     */

    const sections =
        document.querySelectorAll(
            ".option-section"
        );


    sections.forEach(function(section) {

        const firstButton =
            section.querySelector(
                ".round-option"
            );


        if (firstButton) {

            firstButton.classList.add(
                "selected"
            );

        }

    });

}


/* =========================================================
   BASE
========================================================= */

function chooseBase(
    name,
    price,
    button
) {

    currentCustomization.base = {
        name: name,
        price: price
    };


    selectButton(button);

    updateCakePreview();

    updateCustomizationPrice();

    showToast(
        "🍰 Base " + name + " dipilih!"
    );
}


/* =========================================================
   FONDANT
========================================================= */

function chooseFondant(
    name,
    price,
    button
) {

    currentCustomization.fondant = {
        name: name,
        price: price
    };


    selectButton(button);

    updateCakePreview();

    updateCustomizationPrice();

    showToast(
        "🍥 Fondant " + name + " ditambahkan!"
    );
}


/* =========================================================
   CREAM
========================================================= */

function chooseCream(
    name,
    price,
    type,
    button
) {

    currentCustomization.cream = {
        name: name,
        price: price,
        type: type
    };


    selectButton(button);

    updateCakePreview();

    updateCustomizationPrice();

    showToast(
        name === "Tanpa Cream"
            ? "Cream dihapus ♡"
            : "☁️ " + name + " ditambahkan!"
    );
}


/* =========================================================
   DECORATION
========================================================= */

function chooseDecoration(
    name,
    price,
    type,
    button
) {

    currentCustomization.decoration = {
        name: name,
        price: price,
        type: type
    };


    selectButton(button);

    updateCakePreview();

    updateCustomizationPrice();


    if (name !== "Tanpa Hiasan") {

        showToast(
            "✨ " + name + " ditambahkan!"
        );

    }

}


/* =========================================================
   PACKAGING
========================================================= */

function choosePacking(
    name,
    price,
    button
) {

    currentCustomization.packing = {
        name: name,
        price: price
    };


    selectButton(button);

    updateCakePreview();

    updateCustomizationPrice();

    showToast(
        "🎁 Box " + name + " dipilih!"
    );
}


/* =========================================================
   SELECT BUTTON
========================================================= */

function selectButton(button) {

    if (!button) {
        return;
    }


    const parent =
        button.parentElement;


    if (parent) {

        parent
            .querySelectorAll(".round-option")
            .forEach(function(item) {

                item.classList.remove(
                    "selected"
                );

            });

    }


    button.classList.add("selected");
}


/* =========================================================
   QUANTITY
========================================================= */

function changeQuantity(amount) {

    currentQuantity += amount;


    if (currentQuantity < 1) {

        currentQuantity = 1;

    }


    if (currentQuantity > 20) {

        currentQuantity = 20;

    }


    const quantityValue =
        document.getElementById(
            "quantityValue"
        );


    if (quantityValue) {

        quantityValue.innerText =
            currentQuantity;

    }

}


/* =========================================================
   CAKE PREVIEW
========================================================= */

function updateCakePreview() {

    const cakeBase =
        document.getElementById(
            "cakeBase"
        );


    const cakeBox =
        document.getElementById(
            "cakeBox"
        );


    const previewFondant =
        document.getElementById(
            "previewFondant"
        );


    const previewCream =
        document.getElementById(
            "previewCream"
        );


    const previewDecoration =
        document.getElementById(
            "previewDecoration"
        );


    const packIcon =
        document.getElementById(
            "packIcon"
        );


    if (!cakeBase) {
        return;
    }


    /*
     * CAKE TYPE
     */

    cakeBase.classList.remove(
        "donut",
        "dream"
    );


    if (currentCake.type === "donut") {

        cakeBase.classList.add("donut");

    }


    if (currentCake.type === "cake") {

        cakeBase.classList.add("dream");

    }


    /*
     * BASE COLOR
     */

    const baseColors = {

        "Vanilla": "#f5dfc8",

        "Cokelat": "#a87560",

        "Strawberry": "#e9aebe",

        "Matcha": "#b9c9a7"

    };


    cakeBase.style.background =
        baseColors[
            currentCustomization.base.name
        ] || "#f5dfc8";


    /*
     * FONDANT COLOR
     */

    const fondantColors = {

        "Vanilla": "#fff4ef",

        "Strawberry": "#f4c7d5",

        "Blueberry": "#cfc6e6",

        "Caramel": "#e6c49b"

    };


    if (previewFondant) {

        previewFondant.style.background =
            fondantColors[
                currentCustomization.fondant.name
            ] || "#fff4ef";

    }


    /*
     * CREAM
     */

    if (previewCream) {

        previewCream.innerHTML = "";


        const creamType =
            currentCustomization.cream.type;


        if (creamType !== "none") {

            const blobs = 4;


            for (
                let i = 0;
                i < blobs;
                i++
            ) {

                const blob =
                    document.createElement(
                        "div"
                    );


                blob.classList.add(
                    "cream-blob"
                );


                if (
                    creamType ===
                    "cheese"
                ) {

                    blob.classList.add(
                        "cream-cheese"
                    );

                }


                if (
                    creamType ===
                    "chocolate"
                ) {

                    blob.classList.add(
                        "cream-chocolate"
                    );

                }


                previewCream.appendChild(
                    blob
                );

            }

        }

    }


    /*
     * DECORATION
     */

    if (previewDecoration) {

        previewDecoration.innerHTML = "";


        const decorationType =
            currentCustomization
                .decoration
                .type;


        if (
            decorationType ===
            "sprinkle"
        ) {

            for (
                let i = 0;
                i < 5;
                i++
            ) {

                const sprinkle =
                    document.createElement(
                        "div"
                    );


                sprinkle.classList.add(
                    "sprinkle"
                );


                previewDecoration.appendChild(
                    sprinkle
                );

            }

        }


        if (
            decorationType ===
            "pearl"
        ) {

            for (
                let i = 0;
                i < 4;
                i++
            ) {

                const pearl =
                    document.createElement(
                        "div"
                    );


                pearl.classList.add(
                    "pearl"
                );


                previewDecoration.appendChild(
                    pearl
                );

            }

        }


        if (
            decorationType ===
            "cherry"
        ) {

            const cherry =
                document.createElement(
                    "div"
                );


            cherry.classList.add(
                "cherry"
            );


            previewDecoration.appendChild(
                cherry
            );

        }

    }


    /*
     * PACKAGING COLOR
     */

    const packingColors = {

        "Pink": "#f3c8d8",

        "Lilac": "#d9c7ed",

        "Cream": "#f5dfc5",

        "Mint": "#c9e4d4"

    };


    if (cakeBox) {

        cakeBox.style.background =
            packingColors[
                currentCustomization
                    .packing
                    .name
            ] || "#f3c8d8";

    }


    /*
     * PACKAGING ICON
     */

    if (packIcon) {

        packIcon.innerText =
            currentCustomization
                .packing
                .name === "Pink"
                ? "♡"
                : "🎁";

    }

}


/* =========================================================
   HITUNG HARGA SATU CAKE
========================================================= */

function getCurrentCakePrice() {

    return (

        currentCake.price +

        currentCustomization.base.price +

        currentCustomization.fondant.price +

        currentCustomization.cream.price +

        currentCustomization.decoration.price +

        currentCustomization.packing.price

    );

}


/* =========================================================
   UPDATE HARGA PREVIEW
========================================================= */

function updateCustomizationPrice() {

    const priceElement =
        document.getElementById(
            "customizationTotal"
        );


    if (!priceElement) {
        return;
    }


    const price =
        getCurrentCakePrice();


    priceElement.innerText =
        formatRupiah(price);


}


/* =========================================================
   BUAT DATA CAKE
========================================================= */

function createCakeData() {

    return {

        name: currentCake.name,

        type: currentCake.type,

        price: getCurrentCakePrice(),

        base: {
            ...currentCustomization.base
        },

        fondant: {
            ...currentCustomization.fondant
        },

        cream: {
            ...currentCustomization.cream
        },

        decoration: {
            ...currentCustomization.decoration
        },

        packing: {
            ...currentCustomization.packing

        }

    };

}


/* =========================================================
   TAMBAH CAKE KE ORDER
========================================================= */

function addCakeToOrder() {

    const quantity =
        currentQuantity;


    /*
     * Kalau hanya 1
     */

    if (quantity === 1) {

        order.cakeItems.push(
            createCakeData()
        );


        showQuantityChoice(
            false,
            0
        );


        return;
    }


    /*
     * Kalau lebih dari 1
     */

    remainingCakes =
        quantity;


    showQuantityChoice(
        true,
        quantity
    );

}


/* =========================================================
   PILIHAN SETELAH QUANTITY
========================================================= */

function showQuantityChoice(
    multiple,
    quantity
) {

    const message =
        document.getElementById(
            "quantityMessage"
        );


    const submessage =
        document.getElementById(
            "quantitySubmessage"
        );


    const buttons =
        document.getElementById(
            "quantityChoiceButtons"
        );


    if (!message || !submessage || !buttons) {
        return;
    }


    buttons.innerHTML = "";


    /*
     * SATU CAKE
     */

    if (!multiple) {

        message.innerText =
            "Mau beli kue lagi? 🍰";


        submessage.innerText =
            "Kamu bisa membeli kue lain dengan topping berbeda atau langsung melihat struk.";


        buttons.innerHTML = `

            <button
                onclick="buyDifferentCake()">
                🎀 Buat kue lain
            </button>

            <button
                class="finish-choice"
                onclick="finishOrder()">
                🧾 Lihat Struk
            </button>

        `;


    }


    /*
     * BANYAK CAKE
     */

    else {

        message.innerText =
            "Kamu membeli " +
            quantity +
            " kue! 🎂";


        submessage.innerText =
            "Mau semua kue menggunakan topping yang sama atau ingin mengaturnya satu-satu?";


        buttons.innerHTML = `

            <button
                onclick="useSameTopping()">
                ☁️ Semua topping sama
            </button>

            <button
                class="secondary-choice"
                onclick="useDifferentTopping()">
                🎀 Atur topping satu-satu
            </button>

        `;

    }


    showPage("quantityPage");
}


/* =========================================================
   SEMUA TOPPING SAMA
========================================================= */

function useSameTopping() {

    /*
     * Tambahkan sebanyak quantity
     */

    for (
        let i = 0;
        i < remainingCakes;
        i++
    ) {

        order.cakeItems.push(
            createCakeData()
        );

    }


    remainingCakes = 0;


    showToast(
        "🍰 Semua kue dibuat dengan topping yang sama!"
    );


    setTimeout(function() {

        showMoreOrderChoice();

    }, 500);

}


/* =========================================================
   TOPPING BERBEDA
========================================================= */

function useDifferentTopping() {

    /*
     * Masukkan 1 cake dahulu
     */

    order.cakeItems.push(
        createCakeData()
    );


    remainingCakes--;


    if (remainingCakes <= 0) {

        showMoreOrderChoice();

        return;

    }


    /*
     * Sisa cake harus dibuat satu-satu
     */

    showToast(
        "🎀 Sekarang buat cake berikutnya!"
    );


    setTimeout(function() {

        showDifferentCakeCustomizer();

    }, 500);

}


/* =========================================================
   CUSTOMIZER UNTUK CAKE BERIKUTNYA
========================================================= */

function showDifferentCakeCustomizer() {

    const heading =
        document.querySelector(
            ".custom-heading h1"
        );


    if (heading) {

        heading.innerHTML =
            "Buat cake berikutnya <span>♡</span>";

    }


    /*
     * Kembali ke menu supaya
     * customer bisa memilih jenis
     * cake yang berbeda.
     */

    showPage("menuPage");

}


/* =========================================================
   BELI CAKE BERBEDA
========================================================= */

function buyDifferentCake() {

    showPage("menuPage");

}


/* =========================================================
   PILIHAN SETELAH SEMUA SELESAI
========================================================= */

function showMoreOrderChoice() {

    const message =
        document.getElementById(
            "quantityMessage"
        );


    const submessage =
        document.getElementById(
            "quantitySubmessage"
        );


    const buttons =
        document.getElementById(
            "quantityChoiceButtons"
        );


    if (!message || !submessage || !buttons) {
        return;
    }


    message.innerText =
        "Pesananmu sudah siap! 🎀";


    submessage.innerText =
        "Mau menambahkan kue lain atau langsung melihat struk pesananmu?";


    buttons.innerHTML = `

        <button
            onclick="buyDifferentCake()">
            🍰 Tambah kue lain
        </button>

        <button
            class="finish-choice"
            onclick="finishOrder()">
            🧾 Lihat Struk
        </button>

    `;


    showPage("quantityPage");

}


/* =========================================================
   FINISH ORDER
========================================================= */

function finishOrder() {

    if (order.cakeItems.length === 0) {

        alert(
            "Belum ada kue di pesanan kamu 💗"
        );

        return;
    }


    calculateOrder();


    saveCustomerPurchase();


    showReceipt();


    showPage("receiptPage");

}


/* =========================================================
   HITUNG TOTAL
========================================================= */

function calculateOrder() {

    order.subtotal = 0;


    order.cakeItems.forEach(
        function(item) {

            order.subtotal +=
                item.price;

        }
    );


    /*
     * DISKON HANYA UNTUK CUSTOMER LAMA
     */

    if (
        order.isReturningCustomer
    ) {

        order.discount =
            order.subtotal * 0.10;

    } else {

        order.discount = 0;

    }


    /*
     * Pajak simulasi 11%
     */

    const afterDiscount =
        order.subtotal -
        order.discount;


    order.tax =
        afterDiscount * 0.11;


    order.total =
        afterDiscount +
        order.tax;

}


/* =========================================================
   SIMPAN CUSTOMER YANG SUDAH BELANJA
========================================================= */

function saveCustomerPurchase() {

    const customerKey =
        "sweetie_customer_" +
        order.customer.toLowerCase();


    const customerData = {

        voucher: order.voucher,

        hasPurchased: true

    };


    localStorage.setItem(

        customerKey,

        JSON.stringify(
            customerData
        )

    );

}


/* =========================================================
   SHOW RECEIPT
========================================================= */

function showReceipt() {

    const receiptItems =
        document.getElementById(
            "receiptItems"
        );


    if (!receiptItems) {
        return;
    }


    receiptItems.innerHTML = "";


    order.cakeItems.forEach(
        function(item, index) {

            const div =
                document.createElement(
                    "div"
                );


            div.className =
                "receipt-item";


            div.innerHTML = `

                <div class="receipt-item-title">

                    ${index + 1}.
                    ${getCakeEmoji(item.type)}
                    ${item.name}

                </div>


                <div class="receipt-detail">

                    <span>
                        Base: ${item.base.name}
                    </span>

                    <span>
                        ${formatRupiah(item.base.price)}
                    </span>

                </div>


                <div class="receipt-detail">

                    <span>
                        Fondant: ${item.fondant.name}
                    </span>

                    <span>
                        ${formatRupiah(item.fondant.price)}
                    </span>

                </div>


                <div class="receipt-detail">

                    <span>
                        Cream: ${item.cream.name}
                    </span>

                    <span>
                        ${formatRupiah(item.cream.price)}
                    </span>

                </div>


                <div class="receipt-detail">

                    <span>
                        Decoration: ${item.decoration.name}
                    </span>

                    <span>
                        ${formatRupiah(item.decoration.price)}
                    </span>

                </div>


                <div class="receipt-detail">

                    <span>
                        Packaging: ${item.packing.name}
                    </span>

                    <span>
                        ${formatRupiah(item.packing.price)}
                    </span>

                </div>


                <div class="receipt-item-total">

                    <span>
                        Harga Kue
                    </span>

                    <strong>
                        ${formatRupiah(item.price)}
                    </strong>

                </div>

            `;


            receiptItems.appendChild(
                div
            );

        }
    );


    /*
     * CUSTOMER
     */

    const receiptCustomer =
        document.getElementById(
            "receiptCustomer"
        );


    if (receiptCustomer) {

        receiptCustomer.innerText =
            order.customer;

    }


    /*
     * VOUCHER
     */

    const receiptVoucher =
        document.getElementById(
            "receiptVoucher"
        );


    if (receiptVoucher) {

        receiptVoucher.innerText =
            order.voucher;

    }


    /*
     * SUBTOTAL
     */

    const subtotal =
        document.getElementById(
            "receiptSubtotal"
        );


    if (subtotal) {

        subtotal.innerText =
            formatRupiah(
                order.subtotal
            );

    }


    /*
     * DISCOUNT
     */

    const discount =
        document.getElementById(
            "receiptDiscount"
        );


    if (discount) {

        discount.innerText =
            "- " +
            formatRupiah(
                order.discount
            );

    }


    /*
     * TAX
     */

    const tax =
        document.getElementById(
            "receiptTax"
        );


    if (tax) {

        tax.innerText =
            "+ " +
            formatRupiah(
                order.tax
            );

    }


    /*
     * TOTAL
     */

    const total =
        document.getElementById(
            "receiptTotal"
        );


    if (total) {

        total.innerText =
            formatRupiah(
                order.total
            );

    }


    /*
     * DISCOUNT MESSAGE
     */

    const discountMessage =
        document.getElementById(
            "receiptDiscountMessage"
        );


    if (discountMessage) {

        if (
            order.isReturningCustomer
        ) {

            discountMessage.innerHTML =
                "💗 <b>Sweetie Cloud mengenali kamu sebagai pelanggan lama!</b><br>" +
                "Kamu mendapatkan diskon pelanggan setia sebesar 10% ✨";

        } else {

            discountMessage.innerHTML =
                "🎀 Ini adalah pesanan pertamamu di Sweetie Cloud!<br>" +
                "Voucher kamu akan tersimpan untuk kunjungan berikutnya ♡";

        }

    }

}


/* =========================================================
   EMOJI CAKE
========================================================= */

function getCakeEmoji(type) {

    if (type === "donut") {
        return "🍩";
    }


    if (type === "cake") {
        return "🎂";
    }


    return "🧁";

}


/* =========================================================
   WHATSAPP
========================================================= */

function sendWhatsApp() {

    calculateOrder();


    let message =
        "🍰 SWEETIE CLOUD 🍰\n\n";


    message +=
        "Halo Sweetie Cloud! Saya ingin melakukan pemesanan.\n\n";


    message +=
        "👤 Nama: " +
        order.customer +
        "\n";


    message +=
        "🎟️ Voucher: " +
        order.voucher +
        "\n\n";


    message +=
        "DETAIL PESANAN\n";


    order.cakeItems.forEach(
        function(item, index) {

            message +=
                "\n" +
                (index + 1) +
                ". " +
                item.name +
                "\n";


            message +=
                "Base: " +
                item.base.name +
                " (" +
                formatRupiah(
                    item.base.price
                ) +
                ")\n";


            message +=
                "Fondant: " +
                item.fondant.name +
                " (" +
                formatRupiah(
                    item.fondant.price
                ) +
                ")\n";


            message +=
                "Cream: " +
                item.cream.name +
                " (" +
                formatRupiah(
                    item.cream.price
                ) +
                ")\n";


            message +=
                "Decoration: " +
                item.decoration.name +
                " (" +
                formatRupiah(
                    item.decoration.price
                ) +
                ")\n";


            message +=
                "Packaging: " +
                item.packing.name +
                " (" +
                formatRupiah(
                    item.packing.price
                ) +
                ")\n";


            message +=
                "Harga kue: " +
                formatRupiah(
                    item.price
                ) +
                "\n";

        }
    );


    message +=
        "\nSubtotal: " +
        formatRupiah(
            order.subtotal
        );


    message +=
        "\nDiskon: -" +
        formatRupiah(
            order.discount
        );


    message +=
        "\nPPh 11% (simulasi): +" +
        formatRupiah(
            order.tax
        );


    message +=
        "\nTOTAL: " +
        formatRupiah(
            order.total
        );


    message +=
        "\n\nMohon konfirmasi pesanan saya ya 💗";


    /*
     * Nomor WhatsApp:
     * 085758915590
     *
     * Untuk wa.me:
     * 6285758915590
     */

    const phone =
        "6285758915590";


    const url =
        "https://wa.me/" +
        phone +
        "?text=" +
        encodeURIComponent(
            message
        );


    window.open(
        url,
        "_blank"
    );

}


/* =========================================================
   EMAIL
========================================================= */

function sendEmail() {

    calculateOrder();


    let body =
        "Halo Sweetie Cloud,\n\n";


    body +=
        "Saya ingin melakukan pemesanan.\n\n";


    body +=
        "Nama: " +
        order.customer +
        "\n";


    body +=
        "Voucher: " +
        order.voucher +
        "\n\n";


    body +=
        "DETAIL PESANAN\n";


    order.cakeItems.forEach(
        function(item, index) {

            body +=
                "\n" +
                (index + 1) +
                ". " +
                item.name +
                "\n";


            body +=
                "Base: " +
                item.base.name +
                " - " +
                formatRupiah(
                    item.base.price
                ) +
                "\n";


            body +=
                "Fondant: " +
                item.fondant.name +
                " - " +
                formatRupiah(
                    item.fondant.price
                ) +
                "\n";


            body +=
                "Cream: " +
                item.cream.name +
                " - " +
                formatRupiah(
                    item.cream.price
                ) +
                "\n";


            body +=
                "Decoration: " +
                item.decoration.name +
                " - " +
                formatRupiah(
                    item.decoration.price
                ) +
                "\n";


            body +=
                "Packaging: " +
                item.packing.name +
                " - " +
                formatRupiah(
                    item.packing.price
                ) +
                "\n";


            body +=
                "Harga kue: " +
                formatRupiah(
                    item.price
                ) +
                "\n";

        }
    );


    body +=
        "\nSubtotal: " +
        formatRupiah(
            order.subtotal
        );


    body +=
        "\nDiskon: -" +
        formatRupiah(
            order.discount
        );


    body +=
        "\nPPh 11% (simulasi): +" +
        formatRupiah(
            order.tax
        );


    body +=
        "\nTOTAL: " +
        formatRupiah(
            order.total
        );


    body +=
        "\n\nTerima kasih 💗";


    const email =
        "kaylaasyfa473@gmail.com";


    const subject =
        "Pesanan Sweetie Cloud - " +
        order.customer;


    const mailto =
        "mailto:" +
        email +
        "?subject=" +
        encodeURIComponent(
            subject
        ) +
        "&body=" +
        encodeURIComponent(
            body
        );


    window.location.href =
        mailto;

}


/* =========================================================
   FORMAT RUPIAH
========================================================= */

function formatRupiah(number) {

    return new Intl.NumberFormat(
        "id-ID",
        {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0
        }
    ).format(number);

}


/* =========================================================
   TOAST
========================================================= */

function showToast(message) {

    const toast =
        document.getElementById(
            "toast"
        );


    if (!toast) {
        return;
    }


    toast.innerText =
        message;


    toast.classList.add("show");


    setTimeout(
        function() {

            toast.classList.remove(
                "show"
            );

        },
        1800
    );

}


/* =========================================================
   RESET ORDER
========================================================= */

function resetOrder() {

    order = {

        customer: "",

        voucher: "",

        isReturningCustomer: false,

        cakeItems: [],

        subtotal: 0,

        discount: 0,

        tax: 0,

        total: 0

    };


    currentCake = {

        name: "Cloud Cupcake",

        price: 18000,

        type: "cupcake"

    };


    resetCustomization();


    const input =
        document.getElementById(
            "customerName"
        );


    if (input) {

        input.value = "";

    }


    showPage("loginPage");

}


/* =========================================================
   BUTTON ANIMATION
========================================================= */

document.addEventListener(
    "click",
    function(event) {

        const button =
            event.target.closest(
                "button"
            );


        if (!button) {
            return;
        }


        button.style.transform =
            "scale(0.96)";


        setTimeout(
            function() {

                button.style.transform =
                    "";

            },
            120
        );

    }
);


/* =========================================================
   ENTER DI INPUT LOGIN
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        const input =
            document.getElementById(
                "customerName"
            );


        if (input) {

            input.addEventListener(
                "keydown",
                function(event) {

                    if (
                        event.key ===
                        "Enter"
                    ) {

                        loginCustomer();

                    }

                }
            );

        }

    }
);