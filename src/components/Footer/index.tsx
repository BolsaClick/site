const Footer = () => {
  return (
    <footer className="bg-gray-800 justify-center flex  text-white py-4 mt-10">
      <div className="flex flex-col p-4 text-center justify-center items-center">
  
        <img 
          src="/images/logo-anhanguera.svg" 
          alt="Logo da Faculdade"
          className="h-16 w-auto mb-2"
        />
      
        <p className="text-sm mt-4">
        © Copyright 2024 Inovit Digital Publicidade LTDA. CNPJ 57.554.723/0001-50. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
