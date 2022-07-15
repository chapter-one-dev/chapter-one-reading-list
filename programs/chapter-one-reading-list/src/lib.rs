use anchor_lang::prelude::*;

declare_id!("2Nn7j2iepkGYBXaRgiq5fHvkqLS9rvMvSBNpGHBavHgu");

#[program]
pub mod chapter_one_reading_list {
    use super::*;

    pub fn add_article(ctx: Context<InitializeArticle>, link: String) -> Result<()> {
        // access article account
        let article: &mut Account<Article> = &mut ctx.accounts.article;
        // access collector account
        let collector: &Signer = &ctx.accounts.collector;
        // get Rust Clock object to get current timestamp
        let clock: Clock = Clock::get().unwrap();

        // use trimmed link
        let trimmed_link: String = String::from(link.trim());

        // check that content is less than 280 chars
        if trimmed_link.chars().count() > 200 {
            return Err(ErrorCode::ArticleLinkTooLong.into());
        }
        // check that link is not empty whitespace
        if trimmed_link.is_empty() {
            return Err(ErrorCode::MissingArticleLink.into());
        }

        // * dereferences collector.key
        // set article collector
        article.collector = *collector.key;
        // set tweet timestamp
        article.timestamp = clock.unix_timestamp;
        // set link
        article.link = trimmed_link;
        Ok(())
    }

    pub fn delete_article(_ctx: Context<DeleteArticle>) -> Result<()> {
        Ok(())
    }
}

#[account]
pub struct Article {
    pub collector: Pubkey, // wallet associated with Article
    pub timestamp: i64,    // time the Article was added
    pub link: String,      // the link to the article
}

// Discriminator stores the type (8 bytes)
const DISCRIMINATOR_LENGTH: usize = 8;
// Pubkey has a max size of 32 bytes
const PUBLIC_KEY_LENGTH: usize = 32;
// Timestamp i64 has a max length of 48 bytes
const TIMESTAMP_LENGTH: usize = 8;
// Vectors (and Strings) store their length at the beginning (4 bytes)
const VEC_LENGTH_PREFIX: usize = 4;
// Article link can't be longer than 200 characters (4 bytes per char)
const LINK_MAX_LENGTH: usize = 4 * 200;

impl Article {
    const MAX_SIZE: usize = DISCRIMINATOR_LENGTH
        + PUBLIC_KEY_LENGTH
        + TIMESTAMP_LENGTH
        + VEC_LENGTH_PREFIX
        + LINK_MAX_LENGTH; // real max link length
}

#[derive(Accounts)]
pub struct InitializeArticle<'info> {
    #[account(init, payer = collector, space = Article::MAX_SIZE)]
    pub article: Account<'info, Article>,
    #[account(mut)]
    pub collector: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct DeleteArticle<'info> {
    #[account(mut, has_one = collector, close = collector)]
    pub article: Account<'info, Article>,
    #[account(mut)]
    pub collector: Signer<'info>,
}

#[error_code]
pub enum ErrorCode {
    #[msg("The provided article link should be 200 characters long maximum.")]
    ArticleLinkTooLong,
    #[msg("An article link must be provided.")]
    MissingArticleLink,
}
