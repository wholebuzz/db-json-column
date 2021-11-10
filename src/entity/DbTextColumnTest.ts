import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class DbJsonColumnTest {
  @PrimaryColumn()
  id: number

  @Column({
    type: 'nvarchar',
    length: 'MAX',
  })
  data: Record<string, any>
}
