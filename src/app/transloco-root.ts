import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TranslocoLoader } from '@ngneat/transloco';

const translations: Record<string, any> = {
  es: {
    header: {
      logo: 'DevPortfolio HQ',
      nav: {
        home: 'Inicio',
        programadores: 'Programadores',
        projects: 'Proyectos',
        services: 'Servicios',
        contact: 'Contacto',
        contactButton: 'Contactar',
        login: 'Ingresar',
        myRequests: 'Mis solicitudes',
        receivedRequests: 'Solicitudes recibidas',
        logout: 'Cerrar sesión'
      },
      language: {
        label: 'Idioma',
        es: 'ES',
        en: 'EN'
      }
    },
    footer: {
      brand: {
        copy: 'Convertimos desafíos empresariales en plataformas SaaS con diseño, seguridad e infraestructura optimizada para clientes exigentes.'
      },
      contact: {
        email: 'contacto@devportfolio.ec',
        phone: '+593 98 123 4567'
      },
      navigation: 'Navegación',
      services: 'Servicios',
      team: 'Equipo',
      demo: 'Agenda una demo',
      links: {
        home: 'Inicio',
        programadores: 'Programadores',
        projects: 'Proyectos',
        services: 'Servicios',
        consulting: 'Consultoría TI',
        fullstack: 'Desarrollo Full Stack',
        cloud: 'Infraestructura Cloud'
      },
      copyright: '© 2026 DevPortfolio Solutions. Todos los derechos reservados.',
      tech: 'Angular · Firebase · Infraestructura empresarial'
    },
    home: {
      hero: {
        eyebrow: 'Agencia tecnológica · Ecuador',
        title: 'Construimos software',
        titleAccent: 'que las empresas confían.',
        copy: 'Agencia boutique enfocada en soluciones digitales corporativas con experiencia en desarrollos Angular, portales empresariales y productos de alto impacto.',
        projectsButton: 'Ver proyectos',
        contactButton: 'Contactarnos'
      },
      stats: {
        experts: 'Expertos en plantilla',
        featuredProjects: 'Proyectos destacados',
        readyServices: 'Servicios listos'
      },
      team: {
        section: 'Equipo',
        heading: 'Una experiencia de producto premium con enfoque técnico.',
        panelLabel: 'Equipo RPG',
        panelDefaultTitle: 'Build de equipo',
        panelHint: 'Pasa el cursor sobre una tarjeta para revelar estadísticas premium.',
        panelSubtitle: 'Selecciona un perfil para ver su rol, nivel y habilidades.',
        level: 'NIVEL',
        score: 'Puntuación 7/7'
      },
      projects: {
        section: 'Proyectos',
        heading: 'Casos visibles con impacto real en producto y diseño.',
        services: {
          section: 'Servicios',
          heading: 'Soluciones pensadas para equipos que buscan escalar con seguridad.'
        }
      },
      services: {
        section: 'Servicios · Experiencia Premium',
        heading: 'Nuestros Servicios'
      }
    },
    programadores: {
      section: 'Programadores · Equipo Elite',
      title: 'Nuestro Equipo Premium',
      total: 'Total programadores: {{count}}'
    },
    services: {
      section: 'Servicios · Experiencia Premium',
      title: 'Nuestros Servicios',
      total: 'Total servicios: {{count}}'
    },
    projects: {
      section: 'Proyectos · Portafolio Premium',
      title: 'Nuestros Proyectos',
      meta: {
        showing: 'Mostrando {{current}} de {{total}}',
        all: 'Todos los proyectos'
      },
      filter: {
        all: 'Todos'
      },
      cta: 'Ver proyecto',
      details: 'Detalles',
      featured: 'Featured'
    },
    contact: {
      badge: 'Solicitud de asesoría',
      heading: 'Cuéntanos sobre tu proyecto',
      copy: 'Selecciona un programador y describe la idea que deseas desarrollar.',
      premiumTitle: 'Contacto premium',
      premiumCopy: 'Completa tu solicitud con seguimiento prioritario y una propuesta inicial de producto.',
      trustTitle: 'Respuesta rápida',
      trustCopy: 'Nuestro equipo revisa los mensajes en menos de 1 hora para que avances con confianza.',
      whatsapp: 'WhatsApp premium',
      email: 'Correo directo',
      whatsappRecipientLabel: 'Enviar a',
      whatsappNote: 'Elige con quién quieres hablar y envía un mensaje listo para responder.',
      emailNote: 'Recibe una respuesta detallada a tu correo electrónico.',
      whatsappMessage: 'Hola, quiero este servicio. Contáctame desde su página.',
      form: {
        title: 'Formulario Premium',
        subtitle: 'Describe tu proyecto y un desarrollador experto te contactará.',
        name: 'Nombre completo',
        email: 'Correo electrónico',
        programmer: 'Programador',
        description: 'Idea o descripción del proyecto',
        placeholderName: 'Escribe tu nombre',
        placeholderEmail: 'correo@ejemplo.com',
        placeholderDescription: 'Describe qué aplicación, página o sistema necesitas...',
        selectProgrammer: 'Selecciona un programador',
        submit: 'Enviar solicitud',
        sending: 'Enviando...'
      },
      messages: {
        success: 'Solicitud enviada correctamente.',
        loginRequired: 'Inicia sesión para enviar la solicitud.',
        errorFill: 'Completa todos los campos del formulario.',
        errorLoad: 'No fue posible cargar los programadores.',
        errorSelect: 'Selecciona un programador válido.',
        errorSend: 'No fue posible enviar la solicitud.'
      }
    },
    misSolicitudes: {
      panelTitle: 'Panel del usuario',
      title: 'Mis',
      titleAccent: 'solicitudes',
      description: 'Consulta los proyectos que has solicitado y revisa su estado.',
      loading: 'Cargando solicitudes...',
      noRequestsTitle: 'Todavía no tienes solicitudes',
      noRequestsCopy: 'Envía una solicitud para comenzar un nuevo proyecto.',
      createRequest: 'Crear solicitud',
      requestProgrammer: 'Programador seleccionado',
      requester: 'Solicitante',
      projectDescription: 'Descripción del proyecto',
      developerResponse: 'Respuesta del programador',
      sentOn: 'Enviada el',
      pendingDate: 'Fecha pendiente',
      overviewTitle: 'Resumen rápido',
      overviewSubtitle: 'Tu panel de solicitudes',
      overviewCopy: 'Gestiona tus solicitudes en un panel moderno con estado, historial y notificaciones claras.',
      notificationsTitle: 'Notificaciones',
      notificationsCopy: 'Alertas recientes sobre tus solicitudes respondidas.',
      noNotifications: 'No hay notificaciones nuevas.',
      timelineTitle: 'Timeline reciente',
      timelineCopy: 'Revisa los últimos movimientos de tus solicitudes.',
      historyLabel: 'Historial',
      historyTitle: 'Registros de solicitud',
      stats: {
        total: 'Solicitudes totales',
        pending: 'Pendientes',
        responded: 'Respondidas',
        rejected: 'Rechazadas'
      },
      notifications: {
        responseReady: 'Tu solicitud fue respondida por {{developer}}.'
      },
      messages: {
        errorLoad: 'No fue posible cargar tus solicitudes.'
      },
      status: {
        responded: 'Respondida',
        rejected: 'Rechazada',
        pending: 'Pendiente'
      }
    },
    auth: {
      login: {
        greeting: '¡Hola de nuevo!',
        description: 'Ingresa tus credenciales para acceder',
        email: 'Correo electrónico',
        password: 'Contraseña',
        submit: 'Iniciar sesión',
        submitting: 'Ingresando...',
        continueWith: 'O continúa con',
        continueWithGoogle: 'Continuar con Google',
        noAccount: '¿No tienes cuenta?',
        register: 'Regístrate aquí',
        errorPopupClosed: 'Cerraste la ventana de Google.'
      },
      register: {
        create: 'Crear cuenta',
        account: 'cuenta',
        description: 'Regístrate para enviar solicitudes',
        email: 'Correo electrónico',
        password: 'Contraseña',
        confirmPassword: 'Confirmar contraseña',
        submit: 'Registrarse',
        submitting: 'Creando cuenta...',
        already: '¿Ya tienes una cuenta?',
        login: 'Inicia sesión'
      },
      errors: {
        requiredEmail: 'El correo electrónico es obligatorio.',
        invalidEmail: 'El correo electrónico no es válido.',
        requiredPassword: 'La contraseña es obligatoria.',
        passwordMin: 'La contraseña debe tener al menos 6 caracteres.',
        requiredConfirm: 'Debes confirmar la contraseña.',
        passwordMismatch: 'Las contraseñas no coinciden.',
        emailInUse: 'Ya existe una cuenta con este correo.',
        weakPassword: 'La contraseña es demasiado débil.',
        invalidCredential: 'El correo o la contraseña son incorrectos.',
        userNotFound: 'No existe una cuenta con este correo.',
        wrongPassword: 'La contraseña es incorrecta.',
        tooManyRequests: 'Demasiados intentos. Intenta nuevamente más tarde.',
        networkFailed: 'Revisa tu conexión a Internet.',
        registerDefault: 'No fue posible crear la cuenta.',
        loginDefault: 'No fue posible iniciar sesión.',
        loginGoogleDefault: 'No fue posible iniciar sesión con Google.'
      }
    }
  },
  en: {
    header: {
      logo: 'DevPortfolio HQ',
      nav: {
        home: 'Home',
        programadores: 'Developers',
        projects: 'Projects',
        services: 'Services',
        contact: 'Contact',
        contactButton: 'Contact',
        login: 'Login',
        myRequests: 'My Requests',
        receivedRequests: 'Received Requests',
        logout: 'Sign Out'
      },
      language: {
        label: 'Language',
        es: 'ES',
        en: 'EN'
      }
    },
    footer: {
      brand: {
        copy: 'We turn business challenges into SaaS platforms with polished design, security, and optimized infrastructure for demanding clients.'
      },
      contact: {
        email: 'contacto@devportfolio.ec',
        phone: '+593 98 123 4567'
      },
      navigation: 'Navigation',
      services: 'Services',
      team: 'Team',
      demo: 'Book a demo',
      links: {
        home: 'Home',
        programadores: 'Developers',
        projects: 'Projects',
        services: 'Services',
        consulting: 'IT Consulting',
        fullstack: 'Full Stack Development',
        cloud: 'Cloud Infrastructure'
      },
      copyright: '© 2026 DevPortfolio Solutions. All rights reserved.',
      tech: 'Angular · Firebase · Enterprise infrastructure'
    },
    home: {
      hero: {
        eyebrow: 'Tech agency · Ecuador',
        title: 'We build software',
        titleAccent: 'that companies trust.',
        copy: 'Boutique agency focused on corporate digital solutions with experience in Angular development, enterprise portals, and high-impact products.',
        projectsButton: 'View projects',
        contactButton: 'Contact us'
      },
      stats: {
        experts: 'Expert team',
        featuredProjects: 'Featured projects',
        readyServices: 'Ready services'
      },
      team: {
        section: 'Team',
        heading: 'A premium product experience with a technical focus.',
        panelLabel: 'RPG Team',
        panelDefaultTitle: 'Team build',
        panelHint: 'Hover over a card to reveal premium statistics.',
        panelSubtitle: 'Select a profile to see their role, level, and skills.',
        level: 'LEVEL',
        score: 'Score 7/7'
      },
      projects: {
        section: 'Projects',
        heading: 'Visible cases with real product and design impact.',
        services: {
          section: 'Services',
          heading: 'Solutions designed for teams that need to scale securely.'
        }
      },
      services: {
        section: 'Services · Premium Experience',
        heading: 'Our Services'
      }
    },
    programadores: {
      section: 'Developers · Elite Team',
      title: 'Our Premium Team',
      copy: 'A visual style inspired by holographic interfaces, high shine and professional RPG experience.',
      total: 'Total developers: {{count}}'
    },
    services: {
      section: 'Services · Premium Experience',
      title: 'Our Services',
      copy: 'A refreshed visual presentation with glassmorphism, holo shimmer, hover lift and smooth animations for every card.',
      total: 'Total services: {{count}}'
    },
    projects: {
      section: 'Projects · Premium Portfolio',
      title: 'Our Projects',
      copy: 'Holographic interface with premium cards, pill-style filters and smooth microinteractions.',
      meta: {
        showing: 'Showing {{current}} of {{total}}',
        all: 'All projects'
      },
      filter: {
        all: 'All'
      },
      cta: 'View project',
      details: 'Details',
      featured: 'Featured'
    },
    contact: {
      badge: 'Consulting request',
      heading: 'Tell us about your project',
      copy: 'Select a developer and describe the idea you want to build.',
      premiumTitle: 'Premium contact',
      premiumCopy: 'Submit your request with priority follow-up and an initial product proposal.',
      trustTitle: 'Fast response',
      trustCopy: 'Our team reviews messages within 1 hour so you can move forward with confidence.',
      whatsapp: 'Premium WhatsApp',
      email: 'Direct email',
      whatsappRecipientLabel: 'Send to',
      whatsappNote: 'Choose who to message and send a ready-to-reply request.',
      emailNote: 'Receive a detailed reply to your email.',
      whatsappMessage: 'Hello, I want this service. Please contact me from your website.',
      form: {
        title: 'Premium form',
        subtitle: 'Describe your project and an expert developer will contact you.',
        name: 'Full name',
        email: 'Email address',
        programmer: 'Developer',
        description: 'Project idea or description',
        placeholderName: 'Enter your name',
        placeholderEmail: 'email@example.com',
        placeholderDescription: 'Describe the app, page or system you need...',
        selectProgrammer: 'Choose a developer',
        submit: 'Send request',
        sending: 'Sending...'
      },
      messages: {
        success: 'Request sent successfully.',
        loginRequired: 'Sign in to send the request.',
        errorFill: 'Complete all form fields.',
        errorLoad: 'Unable to load developers.',
        errorSelect: 'Select a valid developer.',
        errorSend: 'Unable to send the request.'
      }
    },
    misSolicitudes: {
      panelTitle: 'User panel',
      title: 'My',
      titleAccent: 'requests',
      description: 'View the projects you have requested and review their status.',
      loading: 'Loading requests...',
      noRequestsTitle: 'You don’t have requests yet',
      noRequestsCopy: 'Send a request to start a new project.',
      createRequest: 'Create request',
      requestProgrammer: 'Selected developer',
      requester: 'Requester',
      projectDescription: 'Project description',
      developerResponse: 'Developer response',
      sentOn: 'Sent on',
      pendingDate: 'Pending date',
      overviewTitle: 'Quick overview',
      overviewSubtitle: 'Your request dashboard',
      overviewCopy: 'Track your requests with a modern view for status, history, and alerts.',
      notificationsTitle: 'Notifications',
      notificationsCopy: 'Recent alerts for your answered requests.',
      noNotifications: 'No new notifications.',
      timelineTitle: 'Recent timeline',
      timelineCopy: 'Review the latest updates for your requests.',
      historyLabel: 'History',
      historyTitle: 'Request records',
      stats: {
        total: 'Total requests',
        pending: 'Pending',
        responded: 'Responded',
        rejected: 'Rejected'
      },
      notifications: {
        responseReady: 'Your request has been answered by {{developer}}.'
      },
      messages: {
        errorLoad: 'Unable to load your requests.'
      },
      status: {
        responded: 'Responded',
        rejected: 'Rejected',
        pending: 'Pending'
      }
    },
    auth: {
      login: {
        greeting: 'Welcome back!',
        description: 'Enter your credentials to sign in',
        email: 'Email address',
        password: 'Password',
        submit: 'Sign in',
        submitting: 'Signing in...',
        continueWith: 'Or continue with',
        continueWithGoogle: 'Continue with Google',
        noAccount: 'Don’t have an account?',
        register: 'Register here',
        errorPopupClosed: 'You closed the Google window.'
      },
      register: {
        create: 'Create account',
        account: 'account',
        description: 'Sign up to submit requests',
        email: 'Email address',
        password: 'Password',
        confirmPassword: 'Confirm password',
        submit: 'Register',
        submitting: 'Creating account...',
        already: 'Already have an account?',
        login: 'Log in'
      },
      errors: {
        requiredEmail: 'Email is required.',
        invalidEmail: 'Email is not valid.',
        requiredPassword: 'Password is required.',
        passwordMin: 'Password must be at least 6 characters.',
        requiredConfirm: 'Confirm password is required.',
        passwordMismatch: 'Passwords do not match.',
        emailInUse: 'An account already exists with this email.',
        weakPassword: 'The password is too weak.',
        invalidCredential: 'Email or password is incorrect.',
        userNotFound: 'No account exists with this email.',
        wrongPassword: 'The password is incorrect.',
        tooManyRequests: 'Too many attempts. Try again later.',
        networkFailed: 'Check your internet connection.',
        registerDefault: 'Unable to create the account.',
        loginDefault: 'Unable to sign in.',
        loginGoogleDefault: 'Unable to sign in with Google.'
      }
    }
  }
};

@Injectable({ providedIn: 'root' })
export class AppTranslocoLoader implements TranslocoLoader {
  getTranslation(lang: string): Observable<any> {
    return of(translations[lang] ?? translations['es']);
  }
}
