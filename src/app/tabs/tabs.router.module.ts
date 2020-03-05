import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/tabs/feed',
        pathMatch: 'full'
    },
    {
        path: '',
        component: TabsPage,
        children: [

            {
                path: 'feed',
                loadChildren: () => import('../feed/feed.module').then(m => m.FeedPageModule)
            },
            {
                path: 'uploader',
                loadChildren: () => import('../uploader/uploader.module').then(m => m.UploaderPageModule)
            },
            {
                path: 'profile',
                loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule)
            },
            {
                //this path is a dynamic path that loads based on the id
                path: 'post/:id',
                loadChildren: () => import('../post/post.module').then(m => m.PostPageModule)
            },

        ]
    },

]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class TabsRoutingModule { }