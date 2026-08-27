CREATE TABLE projects (id UUID PRIMARY KEY,title VARCHAR(120) NOT NULL,type VARCHAR(80) NOT NULL,description VARCHAR(2000) NOT NULL,project_url VARCHAR(500),mockup_type VARCHAR(40) NOT NULL,cover_image_url TEXT,published BOOLEAN NOT NULL,display_order INTEGER NOT NULL,created_at TIMESTAMP WITH TIME ZONE NOT NULL,updated_at TIMESTAMP WITH TIME ZONE NOT NULL);
CREATE TABLE project_technologies (project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,technology VARCHAR(60) NOT NULL,display_order INTEGER NOT NULL,PRIMARY KEY(project_id,display_order));

CREATE TABLE hero_content (id BIGINT PRIMARY KEY,eyebrow VARCHAR(80) NOT NULL,title_prefix VARCHAR(150) NOT NULL,title_highlight VARCHAR(80) NOT NULL,title_suffix VARCHAR(150) NOT NULL,description VARCHAR(1000) NOT NULL,primary_text VARCHAR(60) NOT NULL,primary_url VARCHAR(300) NOT NULL,secondary_text VARCHAR(60) NOT NULL,secondary_url VARCHAR(300) NOT NULL,location VARCHAR(100) NOT NULL,availability_label VARCHAR(80) NOT NULL,availability_text VARCHAR(120) NOT NULL,photo_url TEXT,stat1_value VARCHAR(60),stat1_label VARCHAR(80),stat2_value VARCHAR(60),stat2_label VARCHAR(80),stat3_value VARCHAR(60),stat3_label VARCHAR(80),stat4_value VARCHAR(60),stat4_label VARCHAR(80));

CREATE TABLE about_content (id BIGINT PRIMARY KEY,eyebrow VARCHAR(80) NOT NULL,title_line_one VARCHAR(180) NOT NULL,title_line_two VARCHAR(180) NOT NULL,title_highlight VARCHAR(180) NOT NULL,bio_label VARCHAR(100) NOT NULL,first_paragraph VARCHAR(1500) NOT NULL,second_paragraph VARCHAR(1500) NOT NULL,cta_text VARCHAR(80) NOT NULL,cta_url VARCHAR(300) NOT NULL);

CREATE TABLE technologies (id UUID PRIMARY KEY,name VARCHAR(80) NOT NULL,slug VARCHAR(100) NOT NULL,icon_url TEXT,color VARCHAR(20),published BOOLEAN NOT NULL,display_order INTEGER NOT NULL);

CREATE TABLE experiences (id UUID PRIMARY KEY,company VARCHAR(120) NOT NULL,role VARCHAR(120) NOT NULL,start_date VARCHAR(7) NOT NULL,end_date VARCHAR(7) NOT NULL,description VARCHAR(2000) NOT NULL,logo_url TEXT,published BOOLEAN NOT NULL,display_order INTEGER NOT NULL,created_at TIMESTAMP WITH TIME ZONE NOT NULL,updated_at TIMESTAMP WITH TIME ZONE NOT NULL);
CREATE TABLE experience_technologies (experience_id UUID NOT NULL REFERENCES experiences(id) ON DELETE CASCADE,technology VARCHAR(60) NOT NULL,display_order INTEGER NOT NULL,PRIMARY KEY(experience_id,display_order));

CREATE TABLE contact_content (id BIGINT PRIMARY KEY,eyebrow VARCHAR(80) NOT NULL,kicker VARCHAR(100) NOT NULL,title_prefix VARCHAR(120) NOT NULL,title_highlight VARCHAR(80) NOT NULL,description VARCHAR(1200) NOT NULL,github_url VARCHAR(500) NOT NULL,github_label VARCHAR(200) NOT NULL,linkedin_url VARCHAR(500) NOT NULL,linkedin_label VARCHAR(200) NOT NULL,email VARCHAR(200) NOT NULL,email_label VARCHAR(100) NOT NULL,form_subject VARCHAR(200) NOT NULL,name_placeholder VARCHAR(120) NOT NULL,email_placeholder VARCHAR(120) NOT NULL,message_placeholder VARCHAR(250) NOT NULL,submit_text VARCHAR(80) NOT NULL,success_message VARCHAR(300) NOT NULL,error_message VARCHAR(300) NOT NULL,footer_name VARCHAR(100) NOT NULL,footer_role VARCHAR(100) NOT NULL,footer_location VARCHAR(100) NOT NULL,footer_copyright VARCHAR(80) NOT NULL);

CREATE TABLE site_settings (id BIGINT PRIMARY KEY,site_name VARCHAR(100) NOT NULL,role VARCHAR(120) NOT NULL,browser_title VARCHAR(180) NOT NULL,meta_description VARCHAR(500) NOT NULL,site_language VARCHAR(10) NOT NULL,display_year VARCHAR(10) NOT NULL,projects_year VARCHAR(10) NOT NULL,technology_year VARCHAR(10) NOT NULL,cv_url VARCHAR(1000),cv_file_name VARCHAR(200));

CREATE TABLE contact_messages (id UUID PRIMARY KEY,name VARCHAR(120) NOT NULL,email VARCHAR(200) NOT NULL,message VARCHAR(3000) NOT NULL,created_at TIMESTAMP WITH TIME ZONE NOT NULL,is_read BOOLEAN NOT NULL);

CREATE INDEX idx_projects_display_order ON projects(display_order);
CREATE INDEX idx_experiences_display_order ON experiences(display_order);
CREATE INDEX idx_technologies_display_order ON technologies(display_order);
CREATE INDEX idx_contact_messages_created_at ON contact_messages(created_at DESC);
