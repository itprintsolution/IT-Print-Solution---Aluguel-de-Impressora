const whatsappNumber =
  "5522999156344";
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

    const printer =
      document.getElementById("printer")
      .value.trim();

    const templateParams = {

      name: name,

      company: company,

      email: email,

      phone: phone,

      printer: printer

    };

    if (
      !name ||
      !company ||
      !email ||
      !phone || 
      !printer
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
      `WhatsApp: ${phone}\n` +
      `Impressora de interesse: ${printer}`;

    const url =
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    const successMessage =
      document.getElementById("success-message");
      successMessage.classList.add("show");

      form.reset();

      setTimeout(() => {

        emailjs.send(
          "service_cmj2czm",
          "template_1tcxbdd",
          templateParams
        )
        .then(() => {

          console.log(
            "Email enviado com sucesso"
          );

        })
        .catch((error) => {

          console.error(
            "Erro ao enviar email:",
            error
          );

        });

        window.open(
          url,
          "_blank"
        );

      }, 2500);

    /* Esconde a mensagem após 10 segundos */
    setTimeout(() => {
      successMessage.classList.remove("show");
    }, 30000);
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

  document
  .querySelectorAll(".product-btn")
  .forEach((botao) => {

    botao.addEventListener("click", () => {

      const impressora =
        botao.dataset.printer;

      const select =
        document.getElementById("printer");

      if (select) {
        select.value = impressora;
      }

    });

});

const chatToggle =
  document.getElementById("chatToggle");

const chatbot =
  document.getElementById("chatbot");

const chatClose =
  document.getElementById("chatClose");

chatToggle.addEventListener("click", () => {

  if (chatbot.style.display === "block") {
    chatbot.style.display = "none";
  } else {
    chatbot.style.display = "block";
  }

});

chatClose.addEventListener("click", () => {

  chatbot.style.display = "none";

});

function adicionarMensagemUsuario(texto) {

  const body =
    document.getElementById("chatBody");

  body.innerHTML += `
    <div class="user-message">
      ${texto}
    </div>
  `;

  body.scrollTop = body.scrollHeight;
}

function chatAction(action) {

  const body =
    document.getElementById("chatBody");

  const textoAcao = {

    orcamento: "Solicitar orçamento",

    impressoras: "Conhecer impressoras",

    locacao: "Como funciona a locação?",

    especialista: "Falar com especialista"

  };

  if (textoAcao[action]) {

    adicionarMensagemUsuario(
      textoAcao[action]
    );

  }

  let resposta = "";

  switch(action) {

    case "orcamento":

      resposta = `

        <div class="bot-message">
          Qual impressora deseja orçar?
        </div>

        <button
          class="chat-option"
          onclick="selecionarImpressora('HP LaserJet Pro M404dn')">

          HP LaserJet Pro M404dn

        </button>

        <button
          class="chat-option"
          onclick="selecionarImpressora('HP LaserJet Pro 4103fdw')">

          HP LaserJet Pro 4103fdw

        </button>

        <button
          class="chat-option"
          onclick="selecionarImpressora('Lexmark CX431adw')">

          Lexmark CX431adw

        </button>

        <button
          class="chat-option"
          onclick="selecionarImpressora('Lexmark MX532adwe')">

          Lexmark MX532adwe

        </button>

        <button
          class="chat-option"
          onclick="chatAction('inicio')">

          Voltar ao início

        </button>

      `;

    break;

    case "impressoras":

      resposta = `
        <div class="bot-message">

          Trabalhamos com impressoras multifuncionais corporativas HP e Lexmark, ideais para empresas que buscam produtividade, qualidade e economia.

          <br><br>

          ✅ Equipamentos para diferentes volumes de impressão

          <br>

          ✅ Manutenção inclusa

          <br>

          ✅ Suporte técnico especializado

          <br><br>

          Clique em "Saber mais" para visualizar os equipamentos disponíveis em nosso catálogo.

        </div>

        <button
          class="chat-option"
          onclick="irParaCatalogo()">

          Saber mais

        </button>

        <button
          class="chat-option"
          onclick="chatAction('orcamento')">

          Solicitar orçamento

        </button>

        <button
          class="chat-option"
          onclick="chatAction('inicio')">

          Voltar ao início

        </button>
      `;

    break;

    case "locacao":

      resposta = `
        <div class="bot-message">

          A locação de impressoras é uma solução prática para empresas que desejam reduzir custos e evitar investimentos na compra de equipamentos.

          <br><br>

          A IT Print Solution disponibiliza os equipamentos e fica responsável pelo suporte e manutenção durante todo o contrato.

          <br><br>

          ✅ Equipamento incluso

          <br>

          ✅ Manutenção preventiva e corretiva

          <br>

          ✅ Suporte técnico especializado

          <br>

          ✅ Menos preocupações com a gestão de impressão

          <br><br>

          Nossa equipe pode indicar a solução ideal para a sua necessidade.

        </div>

        <button
          class="chat-option"
          onclick="chatAction('orcamento')">

          Solicitar orçamento

        </button>

        <button
          class="chat-option"
          onclick="chatAction('especialista')">

          Falar com especialista

        </button>

        <button
          class="chat-option"
          onclick="chatAction('inicio')">

          Voltar ao início

        </button>
      `;

    break;

    case "especialista":

      const mensagem = encodeURIComponent(
      "Olá! Estava navegando no site da IT Print Solution e gostaria de falar com um especialista sobre locação de impressoras."
    );

    window.open(
      `https://wa.me/5522999156344?text=${mensagem}`,
      "_blank"
    );

  return;

    case "inicio":

      body.innerHTML = `
        <div class="bot-message">

        Olá! 👋

        <br><br>

        Como posso ajudar?

        <br><br>

        ✅ Orçamento gratuito

        <br><br>

        🕒 Atendimento comercial

        <br>

        Segunda a Sexta

        <br>

        08h às 18h

      </div>

        <button class="chat-option" onclick="chatAction('orcamento')">
          Solicitar orçamento
        </button>

        <button class="chat-option" onclick="chatAction('impressoras')">
          Conhecer impressoras
        </button>

        <button class="chat-option" onclick="chatAction('locacao')">
          Como funciona a locação?
        </button>

        <button class="chat-option" onclick="chatAction('especialista')">
          Falar com especialista
        </button>
      `;
      return;
  }

body.innerHTML += `
  <div class="typing-message">
    Digitando...
  </div>
`;

body.scrollTop = body.scrollHeight;

setTimeout(() => {

  document
    .querySelector(".typing-message")
    ?.remove();

  body.innerHTML += resposta;

  body.scrollTop = body.scrollHeight;

}, 1800);
}

function selecionarImpressora(modelo) {

  adicionarMensagemUsuario(
    modelo
  );

  const campo =
    document.getElementById("printer");

  if (campo) {
    campo.value = modelo;
  }

  const body =
    document.getElementById("chatBody");

  body.innerHTML += `

    <div class="bot-message">

      ✅ Excelente escolha!

      <br><br>

      Impressora selecionada:

      <br><br>

      <strong>${modelo}</strong>

      <br><br>

      Complete seus dados para receber
      um orçamento em até 24 horas úteis.

    </div>

    <button
      class="chat-option"
      onclick="fecharChat()">

      Preencher formulário

    </button>

    <button
      class="chat-option"
      onclick="chatAction('inicio')">

      Voltar ao início

    </button>

  `;

  document
    .getElementById("contato")
    .scrollIntoView({
      behavior: "smooth"
    });

  body.scrollTop = body.scrollHeight;
}

function fecharChat() {

  chatbot.style.display = "none";

}

function irParaCatalogo() {

  chatbot.style.display = "none";

  document
    .getElementById("catalogo")
    .scrollIntoView({
      behavior: "smooth"
    });

}