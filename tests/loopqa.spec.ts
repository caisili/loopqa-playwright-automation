import { test, expect, type Page } from '@playwright/test';

const URL = 'https://create-asana-like-pr-39y5.bolt.host/';

type Project = 'Web Application' | 'Mobile Application';
type Status = 'To Do' | 'In Progress' | 'Review' | 'Done';

async function login(page: Page) {
  await page.goto(URL);

  const password = page.locator('input[type="password"]');

  if (await password.isVisible()) {
    await page.locator('input[type="text"], input[type="email"]')
      .first().fill('admin');

    await password.fill('password123');

    await page.getByRole('button', {
      name: /log\s*in|sign\s*in/i
    }).click();
  }

  await expect(
    page.getByRole('heading', { name: 'Web Application', exact: true })
      .first()
  ).toBeVisible();
}

async function selectProject(page: Page, project: Project) {
  const sidebarButton = page.getByRole('button', {
    name: new RegExp(project)
  });

  if (project === 'Mobile Application') {
    await sidebarButton.click();
  }

  await expect(
    page.getByRole('banner').getByRole('heading', {
      name: project,
      exact: true
    })
  ).toBeVisible();
}

async function verifyTask(
  page: Page,
  status: Status,
  taskName: string,
  tags: string[]
) {
  // Locate the status column by its heading.
  const columnHeading = page.getByText(
    new RegExp(`^${status}\\s*\\(\\d+\\)$`)
  );

  await expect(columnHeading).toBeVisible();

  // The heading's parent is expected to contain the task cards.
  const column = columnHeading.locator('..');

  const taskTitle = column.getByText(taskName, { exact: true });
  await expect(taskTitle).toBeVisible();

  // Locate the task card and validate its own tags.
  const card = taskTitle.locator('..');

  for (const tag of tags) {
    await expect(
      card.getByText(tag, { exact: true })
    ).toBeVisible();
  }
}

test.beforeEach(async ({ page }) => {
  await login(page);
});

test('Test Case 1 - User authentication', async ({ page }) => {
  await selectProject(page, 'Web Application');
  await verifyTask(page, 'To Do',
    'Implement user authentication', ['Feature', 'High Priority']);
});

test('Test Case 2 - Navigation bug', async ({ page }) => {
  await selectProject(page, 'Web Application');
  await verifyTask(page, 'To Do',
    'Fix navigation bug', ['Bug']);
});

test('Test Case 3 - Design system updates', async ({ page }) => {
  await selectProject(page, 'Web Application');
  await verifyTask(page, 'In Progress',
    'Design system updates', ['Design']);
});

test('Test Case 4 - Push notification system', async ({ page }) => {
  await selectProject(page, 'Mobile Application');
  await verifyTask(page, 'To Do',
    'Push notification system', ['Feature']);
});

test('Test Case 5 - Offline mode', async ({ page }) => {
  await selectProject(page, 'Mobile Application');
  await verifyTask(page, 'In Progress',
    'Offline mode', ['Feature', 'High Priority']);
});

test('Test Case 6 - App icon design', async ({ page }) => {
  await selectProject(page, 'Mobile Application');
  await verifyTask(page, 'Done',
    'App icon design', ['Design']);
});
