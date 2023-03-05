import { seeder } from 'nestjs-seeder';
import { LocalPrismaModule } from './local-prisma/local-prisma.module';
import { CategoriesSeeder } from './categories/seeders/categories.seeder';

seeder({
  imports: [LocalPrismaModule],
}).run([CategoriesSeeder]);
