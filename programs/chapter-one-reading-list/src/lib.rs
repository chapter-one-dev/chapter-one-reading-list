use anchor_lang::prelude::*;

declare_id!("2Nn7j2iepkGYBXaRgiq5fHvkqLS9rvMvSBNpGHBavHgu");

#[program]
pub mod chapter_one_reading_list {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
