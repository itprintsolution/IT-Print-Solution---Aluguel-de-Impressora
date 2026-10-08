const whatsappNumber =
  "5500000000000";
/* =====================================================
  MENU MOBILE
===================================================== */


const menuToggle =
  document.querySelector(".menu-toggle");


const menu =
  document.querySelector(".menu");


menuToggle.addEventListener(
  "click",
  () => {

    menu.classList.toggle("active");

  }
);



document
  .querySelectorAll(".menu a")
  .forEach(link => {


    link.addEventListener(
      "click",
      () => {

        menu.classList.remove("active");

      }
    );


  });



/* =====================================================
  FILTRO DO CATÁLOGO
===================================================== */


const filterButtons =
  document.querySelectorAll(".filter-btn");


const products =
  document.querySelectorAll(".product-card");


filterButtons.forEach(button => {


  button.addEventListener(
    "click",
    () => {


      const filter =
        button.dataset.filter;


      /*
        Remove o active
        de todos os botões.
      */


      filterButtons.forEach(btn => {

        btn.classList.remove("active");

      });


      /*
        Ativa o botão clicado.
      */


      button.classList.add("active");


      /*
        Filtra os produtos.
      */


      products.forEach(product => {


        const category =
          product.dataset.category;


        if (
          filter === "todos" ||
          category === filter
        ) {


          product.classList.remove(
            "hidden"
          );


        } else {


          product.classList.add(
            "hidden"
          );


        }


      });


    }
  );


});



/* =====================================================
  FORMULÁRIO
===================================================== */


const form =
  document.getElementById(
    "contactForm"
  );


form.addEventListener(
  "submit",
  function (event) {


    event.preventDefault();


    const name =
      document
        .getElementById("name")
        .value
        .trim();


    const company =
      document
        .getElementById("company")
        .value
        .trim();

    const email =
      document
        .getElementById("email")
        .value
        .trim()

    const phone =
      document
        .getElementById("phone")
        .value
        .trim();


    if (
      !name ||
      !company ||
      !email ||
      !phone
    ) {


      alert(
        "Por favor, preencha todos os campos."
      );


      return;


    }


    /*
      Mensagem que será enviada
      para o WhatsApp.
    */


    const message =
      `Olá! Gostaria de solicitar um orçamento para aluguel de impressoras.\n\n` +
      `Nome: ${name}\n` +
      `Empresa: ${company}\n` +
      `E-mail: ${email}\n` +
      `WhatsApp: ${phone}`;


    const url =

      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;


    window.open(
      url,
      "_blank"
    );


  }
);



/* =====================================================
  MÁSCARA DE TELEFONE
===================================================== */


const phoneInput =
  document.getElementById(
    "phone"
  );


phoneInput.addEventListener(
  "input",
  function (event) {


    let value =
      event.target.value
        .replace(/\D/g, "");


    /*
      Limita a 11 números.
    */


    if (
      value.length > 11
    ) {

      value =
        value.substring(
          0,
          11
        );

    }


    /*
      Formato:

      (00) 0000-0000

      ou

      (00) 00000-0000
    */


    if (
      value.length <= 10
    ) {


      value =
        value.replace(
          /^(\d{2})(\d{4})(\d{0,4}).*/,
          "($1) $2-$3"
        );


    } else {


      value =
        value.replace(
          /^(\d{2})(\d{5})(\d{0,4}).*/,
          "($1) $2-$3"
        );


    }


    event.target.value =
      value;


  }
);



/* =====================================================
  ANIMAÇÕES
===================================================== */


const observer =
  new IntersectionObserver(

    entries => {


      entries.forEach(
        entry => {


          if (
            entry.isIntersecting
          ) {


            entry.target
              .classList
              .add("visible");


          }


        }
      );


    },


    {
      threshold: 0.12
    }


  );


document
  .querySelectorAll(".reveal")
  .forEach(element => {


    observer.observe(
      element
    );


  });
