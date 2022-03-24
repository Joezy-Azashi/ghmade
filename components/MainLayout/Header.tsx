import Head from "next/head";

const Header = ({ title = "ghmade" }) => {
  return (
    <Head>
      <title>{title}</title>

      <meta name="description" content="The ghmade is a business platform designed to help business owners and individuals to increase revenue through sales, business partnerships and collaborations, investments, quick jobs and relevant information." />

      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"
      />
      <link
        rel="stylesheet"
        href="https://cdn.datatables.net/1.10.21/css/dataTables.bootstrap4.min.css"
      />
      <link rel="stylesheet" href="/assets/css/bootstrap.min.css" />
      <link rel="stylesheet" href="/assets/css/style.css" />
      <link rel="stylesheet" href="/assets/css/custom.css" />
      <link rel="stylesheet" href="/assets/css/navbar.css" />

      <link
        href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap"
        rel="stylesheet"
      ></link>
      <link
        href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css"
        rel="stylesheet"
      ></link>
      <link href="lib/css/emoji.css" rel="stylesheet"></link>
      <script
        src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.min.js"
        integrity="sha512-Z8CqofpIcnJN80feS2uccz+pXWgZzeKxDsDNMD/dJ6997/LSRY+W4NmEt9acwR+Gt9OHN0kkI1CTianCwoqcjQ=="
        crossOrigin="anonymous"
      ></script>
      <script src="/js/pdfinit.js"></script>

      <script src="lib/js/config.js"></script>
      <script src="lib/js/util.js"></script>
      <script src="lib/js/jquery.emojiarea.js"></script>
      <script src="lib/js/emoji-picker.js"></script>
    </Head>
  );
};

export default Header;
