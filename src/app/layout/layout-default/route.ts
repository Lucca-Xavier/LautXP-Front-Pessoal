import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
    {
        name: 'Dashboard',
        url: '/home/dashboard',
        icon: 'fa fa-bar-chart'
    },
    {
        name: 'Cadastro',
        icon: 'fa fa-plus-square-o',
        url: '/home/cadastro',
        children: [
            {
                name: 'Cliente',
                url: 'cadastro/cliente'
            }
        ]
    },
    {
        name: 'Sistema',
        url: '/home/sistema',
        icon: 'fa fa-users',
        children: [
            {
                name: 'Perfil',
                url: 'sistema/perfil'
            },
            {
                name: 'Usuário',
                url: 'sistema/usuario'
            }
        ]
    },
];
