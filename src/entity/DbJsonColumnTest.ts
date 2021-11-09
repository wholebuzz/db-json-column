import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class DbJsonColumnTest {
  @PrimaryColumn()
  id: number

  @Column({
    type: 'jsonb',
  })
  data: Record<string, any>
}
