import WhatsApp from '@icons/WhatsAppIcon'

export function ContactUs() {
  return (
    <>
      <WhatsApp className="size-8" />
      <a href="https://wa.me/573045909805?text=Hola,%20tengo%20un%20problema%20con%20el%20formulario%20de%20registro%20*CUENTI*">
        ¿Necesitas ayuda?{' '}
        <span className="font-bold text-cuenti-green">Escríbenos</span>
      </a>
    </>
  )
}

export function HaveAccountAlready() {
  return (
    <a href="https://app.cuenti.com/j4pro_erp/nuevo_login/login.html">
      ¿Ya tenes una cuenta?{' '}
      <span className="text-cuenti-blue font-bold">Iniciar sesión</span>
    </a>
  )
}
