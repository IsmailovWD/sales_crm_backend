import { Module, OnModuleInit, Inject } from '@nestjs/common';
import { AcceptLanguageResolver, HeaderResolver, I18nModule as NestI18n, I18nService, QueryResolver } from 'nestjs-i18n';
import path, { join } from 'path';

@Module({
    imports: [
        NestI18n.forRoot({
            fallbackLanguage: 'uz',
            loaderOptions: {
                // path: join(__dirname, '../i18n/'),
                path: join(process.cwd(), 'src/i18n/'),
                watch: true,
            },
            resolvers: [
                { use: QueryResolver, options: ['lang'] },
                new AcceptLanguageResolver({matchType: 'strict'}),
                AcceptLanguageResolver,
            ],
            fallbacks: {
                'uz': 'uz',
                'ru': 'ru',
                'en': 'en',
                'uzk': 'uzk',
            },
        }),
    ],
    controllers: [],
    providers: [],
})
export class I18nModule {}
